(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const el = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const data = window.ORG_DATA;
  // Validate before traversing so a typo in data.js produces a useful message.
  try {
    if (!data || !data.nodes || !data.nodes[data.root]) throw new Error('Simpul root tidak ditemukan.');
    for (const force of data.forces || []) {
      if (!data.nodes[force.root]) throw new Error(`Root matra tidak ditemukan: ${force.root}`);
      for (const [id] of force.nav || []) if (!data.nodes[id]) throw new Error(`Navigasi matra tidak ditemukan: ${id}`);
    }
    for (const [id, node] of Object.entries(data.nodes)) {
      if (!node || typeof node.label !== 'string') throw new Error(`Label tidak valid: ${id}`);
      if (node.children !== undefined && !Array.isArray(node.children)) throw new Error(`children harus berupa daftar: ${id}`);
      if (node.ref && (!data.nodes[node.ref] || data.nodes[node.ref].ref)) throw new Error(`Rujukan tidak valid: ${id}`);
      for (const child of node.children || []) if (!data.nodes[child]) throw new Error(`ID anak tidak ditemukan: ${child}`);
    }
    const done = new Set();
    const checkCycle = (id, ancestors = new Set()) => {
      if (ancestors.has(id)) throw new Error(`Hubungan melingkar pada: ${id}`);
      if (done.has(id)) return;
      const next = new Set([...ancestors, id]);
      for (const child of data.nodes[id].children || []) checkCycle(child, next);
      done.add(id);
    };
    Object.keys(data.nodes).forEach(id => checkCycle(id));
  } catch (error) {
    $('#tree').append(el('p', '', `Data belum dapat dibuka. Periksa data.js: ${error.message}`));
    $('#search').disabled = true;
    $('#search-form').addEventListener('submit', event => event.preventDefault());
    return;
  }

  const nodes = data.nodes;
  const forces = data.forces?.length ? data.forces : [{ id: 'ad', label: 'TNI AD', name: 'TNI Angkatan Darat', root: data.root, nav: [['mabesad', 'Mabesad'], ['kotama', 'Kotama / Satuan utama'], ['pusat', 'Pusat kecabangan'], ['pendidikan', 'Lembaga pendidikan'], ['wilayah', 'Komando kewilayahan']] }];
  let activeForce = forces.find(force => force.root === data.root) || forces[0];
  let renderedForceId = null;
  const storageKey = 'struktur-ad.officers.v1';
  const overrides = Object.create(null);
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      for (const [id, value] of Object.entries(saved)) {
        if (Object.hasOwn(nodes, id) && typeof value === 'string') overrides[id] = value.slice(0, 200);
      }
    }
  } catch { /* file:// or privacy settings may disable browser storage. */ }
  const canonical = id => nodes[id].ref || id;
  const officer = id => {
    const target = canonical(id);
    return Object.hasOwn(overrides, target) ? overrides[target] : nodes[target].officer || '';
  };
  const children = id => nodes[id].children || [];
  const short = id => nodes[id].short || nodes[id].label;
  const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('id').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  const allIds = Object.keys(nodes).filter(id => !nodes[id].ref);
  const paths = new Map(forces.map(force => [force.root, [force.root]]));
  const queue = forces.map(force => force.root);
  for (let index = 0; index < queue.length; index++) {
    const id = queue[index];
    for (const child of children(id)) {
      if (!paths.has(child)) { paths.set(child, [...paths.get(id), child]); queue.push(child); }
    }
  }
  const descendants = id => {
    const result = new Set();
    const walk = current => children(current).forEach(child => {
      if (!result.has(child)) { result.add(child); walk(child); }
    });
    walk(id);
    return result;
  };
  const descendantCount = id => [...descendants(id)].filter(child => !nodes[child].ref).length;
  let viewId = data.root;
  let selectedId = data.root;
  let selectedPath = [data.root];
  let viewPath = [data.root];
  let expanded = new Set([data.root]);
  let matches = [];
  let searchTimer;
  let toastTimer;
  let editId;
  let triggerBeforeDialog;
  let resultIndex = 0;

  let navigation = [];
  forces.forEach(force => {
    const button = el('button', 'force-button', force.label);
    button.type = 'button'; button.dataset.force = force.id;
    button.addEventListener('click', () => { clearSearch(); showView(force.root); });
    $('#force-switch').append(button);
  });
  function renderForce() {
    const theme = {
      ad: { background: '#0d130f', icon: 'favicon.svg' },
      au: { background: '#091923', icon: 'favicon-au.svg' },
      al: { background: '#070f24', icon: 'favicon-al.svg' }
    };
    const palette = theme[activeForce.id] || theme.ad;
    document.documentElement.dataset.force = activeForce.id;
    document.querySelector('meta[name="theme-color"]').setAttribute('content', palette.background);
    document.querySelector('link[rel="icon"]').setAttribute('href', palette.icon);
    $('#force-name').textContent = activeForce.name;
    $('#total-count').textContent = descendantCount(activeForce.root) + 1;
    $('#total-label').textContent = `simpul ${activeForce.label}`;
    document.querySelectorAll('[data-force]').forEach(button => {
      const active = button.dataset.force === activeForce.id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (renderedForceId === activeForce.id) return;
    renderedForceId = activeForce.id;
    navigation = [[activeForce.root, 'Seluruh struktur', '⌘'], ...(activeForce.nav || []).map(([id, label], index) => [id, label, ['▥', '◇', '⊞', '▤', '◎'][index % 5]])];
    $('#navigation').replaceChildren();
    navigation.filter(([id]) => nodes[id]).forEach(([id, label, icon]) => {
      const button = el('button');
      button.type = 'button'; button.dataset.nav = id;
      const mark = el('span', 'nav-icon', icon); mark.setAttribute('aria-hidden', 'true');
      button.append(mark, el('span', '', label), el('span', 'nav-num', id === activeForce.root ? 'ALL' : String(children(id).length).padStart(2, '0')));
      button.addEventListener('click', () => { clearSearch(); showView(id); });
      $('#navigation').append(button);
    });
  }

  function announce(message) { $('#search-status').textContent = message; }
  function toast(message) {
    clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').hidden = false;
    toastTimer = setTimeout(() => { $('#toast').hidden = true; }, 4500);
  }
  function showView(id, path = paths.get(id) || [id], animate = true) {
    clearTimeout(searchTimer);
    if (nodes[id].ref) { id = canonical(id); path = paths.get(id) || [id]; }
    activeForce = forces.find(force => force.root === path[0]) || activeForce;
    viewId = id; selectedId = id; viewPath = [...path]; selectedPath = [...path];
    expanded = new Set([id]);
    render(animate);
  }
  function render(animate = false) {
    renderForce();
    renderBreadcrumbs(); renderTree(animate); renderDetails();
    document.querySelectorAll('[data-nav]').forEach(button => {
      const activeId = viewPath.find(id => id !== activeForce.root && navigation.some(item => item[0] === id)) || activeForce.root;
      const active = button.dataset.nav === activeId;
      button.classList.toggle('active', active);
      if (active) button.setAttribute('aria-current', 'true'); else button.removeAttribute('aria-current');
    });
  }
  function renderBreadcrumbs() {
    const fragment = document.createDocumentFragment();
    viewPath.forEach((id, index) => {
      if (index) { const sep = el('span', '', '›'); sep.setAttribute('aria-hidden', 'true'); fragment.append(sep); }
      const button = el('button', '', index === 0 ? activeForce.label : short(id));
      button.type = 'button';
      if (index === viewPath.length - 1) button.setAttribute('aria-current', 'location');
      button.addEventListener('click', () => { clearSearch(); showView(id, viewPath.slice(0, index + 1)); });
      fragment.append(button);
    });
    $('#breadcrumbs').replaceChildren(fragment);
  }
  function renderTree(animate = false) {
    const makeNode = (id, path, index = 0) => {
      const node = nodes[id];
      const branch = children(id);
      const li = el('li');
      li.style.setProperty('--delay', `${Math.min(index * 55, 330)}ms`);
      const isSelected = id === selectedId && path.join('/') === selectedPath.join('/');
      const row = el('div', `node-row${isSelected ? ' is-selected' : ''}`);
      if (branch.length) {
        const toggle = el('button', 'node-toggle');
        toggle.type = 'button'; toggle.dataset.toggle = path.join('/');
        toggle.setAttribute('aria-label', `${expanded.has(id) ? 'Tutup' : 'Buka'} cabang ${node.label}`);
        toggle.setAttribute('aria-expanded', String(expanded.has(id)));
        const chevron = el('span', 'chevron', '›'); chevron.setAttribute('aria-hidden', 'true'); toggle.append(chevron);
        toggle.addEventListener('click', () => {
          if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
          renderTree();
          Array.from(document.querySelectorAll('[data-toggle]')).find(button => button.dataset.toggle === path.join('/'))?.focus({ preventScroll: true });
        });
        row.append(toggle);
      } else {
        const mark = el('span', 'leaf-mark', node.ref ? '↗' : '·'); mark.setAttribute('aria-hidden', 'true'); row.append(mark);
      }
      const choose = el('button', 'node-select');
      choose.type = 'button'; choose.dataset.select = path.join('/'); choose.setAttribute('aria-pressed', String(isSelected));
      choose.append(el('span', 'node-title', node.label));
      const name = officer(id);
      choose.append(el('span', `node-officer${name ? '' : ' unfilled'}`, name || (node.ref ? 'Rujukan ke simpul utama' : 'Nama pejabat belum diisi')));
      choose.addEventListener('click', () => {
        selectedId = id; selectedPath = [...path]; renderTree(); renderDetails();
        Array.from(document.querySelectorAll('[data-select]')).find(button => button.dataset.select === path.join('/'))?.focus({ preventScroll: true });
      });
      row.append(choose);
      if (branch.length) { const count = el('span', 'child-count', branch.length); count.title = `${branch.length} cabang langsung`; row.append(count); }
      li.append(row);
      if (branch.length && expanded.has(id)) {
        const list = el('ul', 'branch');
        branch.forEach((child, childIndex) => list.append(makeNode(child, [...path, child], childIndex)));
        li.append(list);
      }
      return li;
    };
    const list = el('ul');
    const root = makeNode(viewId, viewPath);
    if (animate) root.classList.add('scan-flash');
    list.append(root); $('#tree').replaceChildren(list);
    $('#branch-count').textContent = `${children(viewId).length} cabang langsung · ${descendantCount(viewId)} simpul di bawahnya`;
    $('#expand-all').disabled = !children(viewId).length;
    $('#collapse-all').disabled = !children(viewId).length;
  }
  function renderDetails() {
    const id = canonical(selectedId);
    const node = nodes[id];
    const fragment = document.createDocumentFragment();
    const emblem = el('div', 'detail-emblem', '⌘'); emblem.setAttribute('aria-hidden', 'true');
    const title = el('h2', '', node.label); title.id = 'detail-heading';
    fragment.append(emblem, el('div', 'detail-short', node.short || 'SIMPUL ORGANISASI'), title);
    const officerBlock = el('div', 'detail-officer');
    officerBlock.append(el('span', 'field-label', 'NAMA PEJABAT'), el('p', 'officer-name', officer(id) || 'Belum diisi'));
    const edit = el('button', 'edit-button', `${officer(id) ? 'Edit' : '+ Tambah'} nama pejabat`);
    edit.type = 'button'; edit.addEventListener('click', () => openEditor(id, edit)); officerBlock.append(edit); fragment.append(officerBlock);
    const stats = el('div', 'detail-stats');
    [[children(id).length, 'Cabang langsung'], [descendantCount(id), 'Seluruh turunan']].forEach(([value, label]) => {
      const item = el('div'); item.append(el('strong', '', value), el('span', '', label)); stats.append(item);
    });
    fragment.append(stats);
    const focus = el('button', 'primary focus-branch', nodes[selectedId].ref ? 'Buka simpul utama ↗' : 'Fokus pada struktur ini →');
    focus.type = 'button'; focus.addEventListener('click', () => {
      clearSearch(); showView(id, nodes[selectedId].ref ? paths.get(id) : selectedPath);
      $('#tree').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
    }); fragment.append(focus);
    const note = el('p', 'source-note');
    const sourceList = (node.sourceIds || []).map(sourceId => data.sources?.[sourceId]).filter(Boolean);
    if (sourceList.length) {
      note.append(el('b', '', 'Rujukan sumber resmi.'), document.createTextNode(' Nama mengikuti sumber bertanggal di bawah; tidak diperbarui otomatis. Struktur masih berupa ringkasan.'));
      sourceList.forEach(source => {
        try {
          const url = new URL(source.url);
          if (!['http:', 'https:'].includes(url.protocol)) return;
          const link = el('a', 'source-link', `${source.title} ↗`);
          link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer';
          note.append(link, el('span', 'source-date', source.published ? `Terbit ${source.published} · dibaca ${source.accessed}` : `Tanggal terbit tidak tercantum · dibaca ${source.accessed}`));
        } catch { /* Ignore malformed links in a manually edited data file. */ }
      });
    } else {
      note.append(el('b', '', 'Sumber: data awal pengguna.'), document.createTextNode(' Struktur dan nama mengikuti data yang diberikan, belum diverifikasi ulang.'));
    }
    if (node.officerEdited || (Object.hasOwn(overrides, id) && overrides[id] !== (node.officer || ''))) note.prepend(el('p', 'local-edit-note', 'Nama pejabat diedit pengguna; rujukan di bawah berlaku untuk data sumber.'));
    if (node.note) note.append(el('br'), document.createTextNode(node.note));
    if (!children(id).length) note.append(el('br'), document.createTextNode('Belum ada rincian bawahan dalam data.'));
    fragment.append(note);
    const exportButton = el('button', 'export-button', '↓ Ekspor data (.js)');
    exportButton.type = 'button'; exportButton.addEventListener('click', exportData); fragment.append(exportButton);
    $('#details').replaceChildren(fragment);
  }
  function clearSearch() {
    clearTimeout(searchTimer); $('#search').value = ''; $('#clear-search').hidden = true;
    $('#search-results').hidden = true; matches = []; announce('Pencarian dihapus.');
  }
  function findMatches(query) {
    const q = normalize(query);
    if (!q) return [];
    const words = q.split(' ');
    return allIds.filter(id => paths.has(id)).map((id, index) => {
      const node = nodes[id];
      const label = normalize(node.label), abbreviation = normalize(node.short || ''), name = normalize(officer(id));
      const aliases = (node.aliases || []).map(normalize);
      const haystack = [label, abbreviation, name, ...aliases].join(' ');
      let rank = 0;
      if (label === q || abbreviation === q || aliases.includes(q)) rank = 100;
      else if (name === q) rank = 90;
      else if (label.startsWith(q) || abbreviation.startsWith(q)) rank = 70;
      else if (name.includes(q)) rank = 60;
      else if (words.every(word => haystack.includes(word))) rank = 40;
      return { id, rank, index };
    }).filter(result => result.rank > 0).sort((a, b) => b.rank - a.rank || a.index - b.index).map(result => result.id);
  }
  function renderResults() {
    const resultBox = $('#search-results'); resultBox.replaceChildren(); resultBox.hidden = false;
    if (!matches.length) {
      const empty = el('div', 'empty-result');
      empty.append(el('strong', '', 'Tidak ada hasil yang cocok'), el('p', '', 'Coba KASAD, KASAU, KASAL, atau nama satuan. Pencarian mencakup ketiga matra.'));
      resultBox.append(empty); return;
    }
    resultBox.append(el('div', 'results-heading', `${matches.length} hasil · ${matches.length > 12 ? '12 ditampilkan · persempit kata pencarian' : 'Pilih hasil untuk membuka struktur'}`));
    matches.slice(0, 12).forEach((id, index) => {
      const button = el('button', `search-result${index === resultIndex ? ' selected' : ''}`);
      button.type = 'button';
      const force = forces.find(item => item.root === paths.get(id)?.[0]);
      button.append(el('strong', '', nodes[id].label), el('small', '', `${force?.label || ''} · ${officer(id) || 'Nama pejabat belum diisi'} · ${children(id).length} cabang`));
      button.addEventListener('click', () => chooseResult(id)); resultBox.append(button);
    });
  }
  function runSearch(autoOpen = true) {
    clearTimeout(searchTimer);
    if (!normalize($('#search').value)) { clearSearch(); return; }
    matches = findMatches($('#search').value); resultIndex = 0;
    renderResults();
    if (matches.length && autoOpen) {
      showView(matches[0]);
      const best = nodes[matches[0]];
      const exact = [best.label, best.short || '', ...(best.aliases || [])].some(value => normalize(value) === normalize($('#search').value));
      // Exact or unique results reveal the hierarchy without a suggestion overlay.
      if (exact || matches.length === 1) $('#search-results').hidden = true;
    }
    announce(matches.length ? `${matches.length} hasil. Struktur ${nodes[matches[0]].label} ditampilkan.` : 'Tidak ada hasil yang cocok.');
  }
  function chooseResult(id) {
    showView(id); $('#search-results').hidden = true;
    announce(`Struktur ${nodes[id].label} dibuka, ${children(id).length} cabang langsung.`);
  }
  $('#search').addEventListener('input', () => {
    clearTimeout(searchTimer); $('#clear-search').hidden = !$('#search').value;
    if (!normalize($('#search').value)) { clearSearch(); showView(activeForce.root); return; }
    // Hide stale suggestions while a new query is being evaluated.
    $('#search-results').hidden = true; matches = [];
    searchTimer = setTimeout(() => runSearch(), 280);
  });
  $('#search').addEventListener('keydown', event => {
    if (event.key === 'Escape') { clearTimeout(searchTimer); $('#search-results').hidden = true; }
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      if (!matches.length) runSearch(false);
      if (!matches.length) return;
      const length = Math.min(matches.length, 12);
      resultIndex = (resultIndex + (event.key === 'ArrowDown' ? 1 : -1) + length) % length;
      renderResults();
      const buttons = $('#search-results').querySelectorAll('button');
      buttons[resultIndex]?.scrollIntoView({ block: 'nearest' });
      announce(`Hasil ${resultIndex + 1}: ${nodes[matches[resultIndex]].label}`);
    }
  });
  $('#search-form').addEventListener('submit', event => {
    event.preventDefault(); clearTimeout(searchTimer);
    if (!normalize($('#search').value)) { clearSearch(); showView(activeForce.root); return; }
    if (!matches.length) runSearch(false);
    if (matches.length) chooseResult(matches[resultIndex] || matches[0]);
  });
  $('#clear-search').addEventListener('click', () => { clearSearch(); showView(activeForce.root); $('#search').focus(); });
  document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
    $('#search').value = button.dataset.query; $('#clear-search').hidden = false;
    runSearch(); $('#search-results').hidden = true;
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.search-section')) { clearTimeout(searchTimer); $('#search-results').hidden = true; }
  });
  $('#brand-home').addEventListener('click', event => { event.preventDefault(); clearSearch(); showView(activeForce.root); });
  $('#expand-all').addEventListener('click', () => {
    expanded = new Set([viewId, ...descendants(viewId)]); renderTree(); announce('Semua cabang dalam tampilan dibuka.');
  });
  $('#collapse-all').addEventListener('click', () => {
    expanded.clear(); selectedId = viewId; selectedPath = [...viewPath]; renderTree(); renderDetails(); announce('Semua cabang dalam tampilan ditutup.');
  });
  function openEditor(id, trigger) {
    editId = id; triggerBeforeDialog = trigger;
    $('#edit-role').textContent = nodes[id].label; $('#officer-input').value = officer(id);
    $('#edit-dialog').showModal(); $('#officer-input').focus();
  }
  const closeEditor = () => $('#edit-dialog').close();
  $('#close-dialog').addEventListener('click', closeEditor);
  $('#cancel-edit').addEventListener('click', closeEditor);
  $('#edit-dialog').addEventListener('close', () => {
    if (triggerBeforeDialog?.isConnected) triggerBeforeDialog.focus(); else $('#details .edit-button')?.focus();
  });
  $('#edit-form').addEventListener('submit', event => {
    event.preventDefault(); overrides[editId] = $('#officer-input').value.trim();
    let saved = true;
    try { localStorage.setItem(storageKey, JSON.stringify(overrides)); } catch { saved = false; }
    renderTree(); renderDetails(); closeEditor();
    if (!$('#search-results').hidden) { matches = findMatches($('#search').value); resultIndex = 0; renderResults(); }
    toast(saved ? 'Nama pejabat disimpan di browser ini.' : 'Nama diubah untuk sesi ini. Ekspor data agar perubahan tersimpan.');
  });
  function exportData() {
    const copy = JSON.parse(JSON.stringify(data));
    Object.entries(overrides).forEach(([id, name]) => {
      if (copy.nodes[id]) {
        if (name !== (copy.nodes[id].officer || '')) copy.nodes[id].officerEdited = true;
        copy.nodes[id].officer = name;
      }
    });
    const text = '// Data Struktur TNI (AD, AU, AL). Ganti data.js dengan file ini untuk memakai perubahan.\nwindow.ORG_DATA = ' + JSON.stringify(copy, null, 2) + ';\n';
    $('#export-content').value = text;
    $('#export-dialog').showModal();
  }
  $('#close-export').addEventListener('click', () => $('#export-dialog').close());
  $('#select-export').addEventListener('click', () => { $('#export-content').focus(); $('#export-content').select(); });
  $('#download-export').addEventListener('click', () => {
    const text = $('#export-content').value;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/javascript;charset=utf-8' }));
    const link = el('a'); link.href = url; link.download = 'data.js'; document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    toast('Ekspor dimulai. Simpan sebagai data.js di folder aplikasi.');
  });
  render();
})();
