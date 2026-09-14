(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const el = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  // Small inline-SVG icon set (stroke, currentColor) replacing the old
  // unicode glyphs — renders identically across devices/fonts.
  const ICONS = {
    hub: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="17" r="2.2"/><circle cx="19" cy="17" r="2.2"/><path d="M12 7.2v3.3M12 10.5 6.5 15.2M12 10.5l5.5 4.7"/></svg>',
    rows: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    diamond: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3.5 20.5 12 12 20.5 3.5 12Z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="1"/><rect x="13" y="13" width="7.5" height="7.5" rx="1"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="5" cy="6" r="1.2" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1.2" fill="currentColor" stroke="none"/><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/></svg>',
    circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    half: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 4 21 19.5H3Z"/><line x1="12" y1="10" x2="12" y2="14.5"/><circle cx="12" cy="17.2" r=".9" fill="currentColor" stroke="none"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 12H2.2M21.8 12h-2.4M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 0 0 11.2 11.2Z"/></svg>'
  };
  const elIcon = (tag, className, iconName) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    element.innerHTML = ICONS[iconName] || '';
    return element;
  };
  function syncThemeColor(){
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg || '#060a0c');
  }
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
  const storageKey = 'struktur-tni.officers.v5';
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

  const verification = (id) => {
    const node = nodes[id];
    const ids = new Set([...(node.sourceIds || []), ...(node.address?.sourceIds || [])]);
    const sources = [...ids].map(sourceId => data.sources?.[sourceId]).filter(Boolean);
    const official = sources.some(source => /(?:tniad\.mil\.id|tni-au\.mil\.id|tnial\.mil\.id|\.tnial\.mil\.id|akmil\.ac\.id|aau\.ac\.id)/i.test(source.url || ''));
    if (official || /sumber resmi/i.test(node.address?.status || '')) return { level: 'verified', label: 'Verified — Official Source', sources };
    if (sources.length) return { level: 'secondary', label: 'Source recorded — Review advised', sources };
    return { level: 'needs', label: 'Needs verification', sources: [] };
  };
  const forceOf = id => forces.find(force => force.root === paths.get(id)?.[0]) || activeForce;
  const provenanceText = id => {
    const v = verification(id);
    if (v.level === 'verified') return 'Official evidence';
    if (v.level === 'secondary') return 'Source recorded';
    return 'Needs verification';
  };

  const forcePresentation = {
    ad: {
      kicker: 'KARTIKA INDONESIA',
      title: 'TNI ANGKATAN DARAT',
      subtitle: 'Menjaga kedaulatan darat dan kehormatan Indonesia.',
      motto: 'Kartika Eka Paksi',
      mottoSub: 'Pengabdian untuk Indonesia'
    },
    au: {
      kicker: 'DIRGANTARA INDONESIA',
      title: 'TNI ANGKATAN UDARA',
      subtitle: 'Menjaga kedaulatan udara demi Indonesia maju.',
      motto: 'Swa Bhuwana Paksa',
      mottoSub: 'Di langit kami berbakti'
    },
    al: {
      kicker: 'SAMUDRA INDONESIA',
      title: 'TNI ANGKATAN LAUT',
      subtitle: 'Menjaga kedaulatan laut dan kepentingan maritim Indonesia.',
      motto: 'Jalesveva Jayamahe',
      mottoSub: 'Justru di laut kita jaya'
    }
  };

  const forceBrand = {
    ad: {
      logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Insignia_of_the_Indonesian_Army.svg/330px-Insignia_of_the_Indonesian_Army.svg.png',
      fallback: 'favicon.svg',
      title: 'Kartika Eka Paksi'
    },
    au: {
      logo: 'logo-au.png',
      fallback: 'logo-au.png',
      title: 'Swa Bhuwana Paksa'
    },
    al: {
      logo: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Insignia_of_the_Indonesian_Navy.svg/500px-Insignia_of_the_Indonesian_Navy.svg.png',
      fallback: 'favicon-al.svg',
      title: 'Jalesveva Jayamahe'
    }
  };
  const setLogo = (img, brand) => {
    if (!img || !brand) return;
    img.onerror = () => {
      img.onerror = null;
      img.src = brand.fallback;
      img.classList.add('is-fallback');
    };
    img.classList.remove('is-fallback');
    img.src = brand.logo;
  };

  let navigation = [];
  forces.forEach(force => {
    const button = el('button', 'force-button');
    button.type = 'button'; button.dataset.force = force.id;
    const brand = forceBrand[force.id];
    const logoWrap = el('span', 'force-logo-wrap');
    const logo = document.createElement('img');
    logo.className = 'force-logo'; logo.alt = ''; logo.loading = 'eager';
    if (brand) setLogo(logo, brand);
    logoWrap.append(logo);
    button.append(logoWrap, el('span', 'force-button-label', force.label));
    button.title = brand ? `${force.label} — ${brand.title}` : force.label;
    button.addEventListener('click', () => { clearSearch(); showView(force.root); });
    $('#force-switch').append(button);
  });
  function renderPersonnelPublication() {
    const publication = data.personnelPublication || {};
    const byForce = publication.forces || {};
    ['ad','al','au'].forEach(forceId => {
      const target = document.getElementById(`personnel-${forceId}`);
      if (!target) return;
      const value = byForce[forceId]?.publishedTotal;
      target.textContent = Number.isFinite(value) ? new Intl.NumberFormat('id-ID').format(value) : '—';
    });
    document.querySelectorAll('[data-personnel-force]').forEach(card => {
      card.classList.toggle('active', card.dataset.personnelForce === activeForce.id);
    });
  }

  function renderForce() {
    const theme = { ad: { icon: 'favicon.svg' }, au: { icon: 'favicon-au.svg' }, al: { icon: 'favicon-al.svg' } };
    const palette = theme[activeForce.id] || theme.ad;
    document.documentElement.dataset.force = activeForce.id;
    syncThemeColor();
    document.querySelector('link[rel="icon"]').setAttribute('href', palette.icon);
    const currentBrand = forceBrand[activeForce.id];
    if (currentBrand) {
      setLogo($('#brand-logo'), currentBrand);
      setLogo($('#topbar-logo'), currentBrand);
    }
    $('#force-name').textContent = activeForce.name;
    const presentation = forcePresentation[activeForce.id] || forcePresentation.ad;
    $('#force-motto').textContent = presentation.motto.toUpperCase();
    $('#hero-kicker').textContent = presentation.kicker;
    $('#hero-title').textContent = presentation.title;
    $('#hero-subtitle').textContent = presentation.subtitle;
    $('#hero-motto').textContent = presentation.motto;
    $('#hero-motto-sub').textContent = presentation.mottoSub;
    const forceNodeIds = [activeForce.root, ...descendants(activeForce.root)].filter(id => !nodes[id].ref);
    const totalNodes = forceNodeIds.length;
    const verifiedCount = forceNodeIds.filter(id => verification(id).level === 'verified').length;
    const sourceIds = new Set();
    forceNodeIds.forEach(id => {
      (nodes[id].sourceIds || []).forEach(sourceId => sourceIds.add(sourceId));
      (nodes[id].address?.sourceIds || []).forEach(sourceId => sourceIds.add(sourceId));
    });
    $('#stat-total').textContent = totalNodes;
    $('#stat-main').textContent = children(activeForce.root).length;
    $('#stat-address').textContent = verifiedCount;
    $('#stat-sources').textContent = sourceIds.size;
    const readoutTotal = $('#readout-total'); if (readoutTotal) readoutTotal.textContent = totalNodes;
    const readoutCoverage = $('#readout-coverage');
    if (readoutCoverage) readoutCoverage.textContent = totalNodes ? `${Math.round((verifiedCount / totalNodes) * 100)}%` : '—';
    renderPersonnelPublication();
    document.querySelectorAll('[data-force]').forEach(button => {
      const active = button.dataset.force === activeForce.id;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (renderedForceId === activeForce.id) return;
    renderedForceId = activeForce.id;
    navigation = [[activeForce.root, 'Seluruh struktur', 'hub'], ...(activeForce.nav || []).map(([id, label], index) => [id, label, ['rows', 'diamond', 'grid', 'list', 'circle'][index % 5]])];
    $('#navigation').replaceChildren();
    navigation.filter(([id]) => nodes[id]).forEach(([id, label, icon]) => {
      const button = el('button');
      button.type = 'button'; button.dataset.nav = id;
      const mark = elIcon('span', 'nav-icon', icon); mark.setAttribute('aria-hidden', 'true');
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
    const emblem = elIcon('div', 'detail-emblem', 'hub'); emblem.setAttribute('aria-hidden', 'true');
    const title = el('h2', '', node.label); title.id = 'detail-heading';
    fragment.append(emblem, el('div', 'detail-short', node.short || 'SIMPUL ORGANISASI'), title);
    const verify = verification(id);
    const trust = el('div', `trust-badge trust-${verify.level}`);
    trust.append(elIcon('span', '', verify.level === 'verified' ? 'check' : verify.level === 'secondary' ? 'half' : 'warn'), el('strong', '', verify.label));
    fragment.append(trust);
    const profileMeta = el('div', 'profile-meta');
    profileMeta.append(el('span', '', forceOf(id).label), el('span', '', `ID: ${id}`), el('span', '', node.address?.verified ? `Verified: ${node.address.verified}` : 'Verification date: —'));
    fragment.append(profileMeta);
    const officerBlock = el('div', 'detail-officer');
    officerBlock.append(el('span', 'field-label', 'NAMA PEJABAT'), el('p', 'officer-name', officer(id) || 'Belum diisi'));
    const edit = el('button', 'edit-button', `${officer(id) ? 'Edit' : '+ Tambah'} nama pejabat`);
    edit.type = 'button'; edit.addEventListener('click', () => openEditor(id, edit)); officerBlock.append(edit); fragment.append(officerBlock);
    const stats = el('div', 'detail-stats');
    [[children(id).length, 'Cabang langsung'], [descendantCount(id), 'Seluruh turunan']].forEach(([value, label]) => {
      const item = el('div'); item.append(el('strong', '', value), el('span', '', label)); stats.append(item);
    });
    fragment.append(stats);
    if (node.address?.text) {
      const addressBlock = el('section', 'detail-address');
      addressBlock.append(el('span', 'field-label', 'ALAMAT MARKAS / SATUAN'));
      addressBlock.append(el('p', 'address-text', node.address.text));
      const meta = el('div', 'address-meta');
      if (node.address.status) meta.append(el('span', 'address-badge', node.address.status));
      if (node.address.verified) meta.append(el('span', 'address-verified', `Diverifikasi ${node.address.verified}`));
      addressBlock.append(meta);
      const actions = el('div', 'address-actions');
      const map = el('a', 'address-link', 'Buka peta ↗');
      map.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(node.address.text)}`;
      map.target = '_blank'; map.rel = 'noopener noreferrer'; actions.append(map);
      const addressSources = (node.address.sourceIds || []).map(sourceId => data.sources?.[sourceId]).filter(Boolean);
      addressSources.forEach(source => {
        try {
          const url = new URL(source.url);
          if (!['http:', 'https:'].includes(url.protocol)) return;
          const link = el('a', 'address-link', `${source.title} ↗`);
          link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; actions.append(link);
        } catch { /* Abaikan URL sumber yang rusak. */ }
      });
      addressBlock.append(actions);
      if (node.address.note) addressBlock.append(el('p', 'address-note', node.address.note));
      fragment.append(addressBlock);
    }
    const history = el('section', 'history-block');
    history.append(el('span', 'field-label', 'RIWAYAT PEJABAT / AUDIT'));
    if (Array.isArray(node.history) && node.history.length) {
      node.history.forEach(item => {
        const row = el('div', 'history-row');
        row.append(el('strong', '', item.officer || '—'), el('span', '', [item.from, item.to].filter(Boolean).join(' — ') || 'Periode belum dicatat'));
        history.append(row);
      });
    } else history.append(el('p', 'muted', 'Belum tersedia dalam dataset. Sistem tidak membuat riwayat tanpa sumber.'));
    fragment.append(history);
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
    const filter = $('#search-filter')?.value || 'all';
    return allIds.filter(id => paths.has(id)).filter(id => {
      const node = nodes[id];
      if (filter === 'officer') return Boolean(officer(id));
      if (filter === 'location') return Boolean(node.address?.text);
      if (filter === 'verified') return verification(id).level === 'verified';
      if (filter === 'unit') return Boolean((node.children || []).length || node.short || node.address?.text);
      return true;
    }).map((id, index) => {
      const node = nodes[id];
      const label = normalize(node.label), abbreviation = normalize(node.short || ''), name = normalize(officer(id));
      const aliases = (node.aliases || []).map(normalize);
      const address = normalize([node.address?.text, node.address?.city, node.address?.province].filter(Boolean).join(' '));
      const haystack = [label, abbreviation, name, address, ...aliases].join(' ');
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
      button.append(el('strong', '', nodes[id].label), el('small', '', `${force?.label || ''} · ${officer(id) || 'Nama pejabat belum diisi'} · ${provenanceText(id)} · ${children(id).length} cabang`));
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
  $('#top-search-jump')?.addEventListener('click', () => {
    const input = $('#search');
    input?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(() => input?.focus(), 180);
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
  // Professional platform enhancements: quality metrics, source center, institutional directory, i18n, theme and PWA.
  function updateQuality() {
    const ids = [activeForce.root, ...descendants(activeForce.root)].filter(id => !nodes[id].ref);
    const verified = ids.filter(id => verification(id).level === 'verified').length;
    const needs = ids.filter(id => verification(id).level === 'needs').length;
    const coverage = ids.length ? Math.round(((ids.length - needs) / ids.length) * 100) : 0;
    $('#quality-coverage').textContent = `${coverage}%`;
    $('#coverage-progress').value = coverage;
    $('#quality-verified').textContent = verified;
    $('#quality-needs').textContent = needs;
  }
  const baseRender = render;
  render = function(animate = false) { baseRender(animate); updateQuality(); };

  function openSourceCenter() {
    const refs = Object.entries(data.sources || {});
    const usage = new Map(refs.map(([id]) => [id, 0]));
    Object.values(nodes).forEach(node => [...(node.sourceIds || []), ...(node.address?.sourceIds || [])].forEach(id => usage.set(id, (usage.get(id) || 0) + 1)));
    const draw = () => {
      const q = normalize($('#source-search').value || '');
      const list = refs.filter(([,src]) => !q || normalize(`${src.title} ${src.url}`).includes(q));
      const frag = document.createDocumentFragment();
      list.forEach(([id,src]) => {
        const card = el('article','source-card');
        const domain = (()=>{try{return new URL(src.url).hostname}catch{return 'invalid-url'}})();
        const head = el('div','source-card-head'); head.append(el('strong','',src.title), el('span','source-domain',domain));
        const meta = el('p','',`${src.published ? `Published ${src.published}` : 'Publication date not listed'} · Accessed ${src.accessed || '—'} · ${usage.get(id)||0} record references`);
        const a = el('a','source-link','Open source ↗'); a.href=src.url; a.target='_blank'; a.rel='noopener noreferrer';
        card.append(head,meta,a); frag.append(card);
      });
      $('#source-list').replaceChildren(frag); $('#source-summary').textContent = `${list.length}/${refs.length} sources`;
    };
    $('#source-search').oninput = draw; draw(); $('#source-dialog').showModal();
  }
  function openInstitutionDirectory() {
    const locs = Object.entries(nodes).filter(([,node]) => node.address?.text && verification(Object.keys(nodes).find(k=>nodes[k]===node)).level === 'verified');
    const grouped = new Map();
    locs.forEach(([id,node]) => { const province=node.address.province||'Provinsi belum dicatat'; if(!grouped.has(province)) grouped.set(province,[]); grouped.get(province).push([id,node]); });
    $('#location-summary').textContent = `${locs.length} publicly sourced institutional locations · ${grouped.size} province groups`;
    const frag=document.createDocumentFragment();
    [...grouped.entries()].sort((a,b)=>a[0].localeCompare(b[0])).forEach(([province,items])=>{
      const sec=el('section','location-group'); sec.append(el('h3','',province));
      items.forEach(([id,node])=>{ const row=el('article','location-row'); const force=forceOf(id); const info=el('div'); info.append(el('strong','',node.label),el('span','',`${force.label} · ${node.address.city||''}`),el('small','',node.address.text)); const actions=el('div','location-actions'); const map=el('a','','Map ↗'); map.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(node.address.text)}`;map.target='_blank';map.rel='noopener noreferrer'; const open=el('button','','Open profile');open.type='button';open.onclick=()=>{$('#map-dialog').close();showView(id);};actions.append(open,map);row.append(info,actions);sec.append(row);}); frag.append(sec);
    }); $('#location-list').replaceChildren(frag); $('#map-dialog').showModal();
  }
  $('#open-sources')?.addEventListener('click', openSourceCenter);
  $('#open-personnel-sources')?.addEventListener('click', () => {
    openSourceCenter();
    $('#source-search').value = 'jumlah tni';
    $('#source-search').dispatchEvent(new Event('input'));
  });
  $('#open-map')?.addEventListener('click', openInstitutionDirectory);
  $('#open-methodology')?.addEventListener('click',()=>$('#method-dialog').showModal());
  document.querySelectorAll('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',()=>document.getElementById(btn.dataset.closeDialog)?.close()));
  $('#mobile-menu')?.addEventListener('click',()=>document.body.classList.toggle('sidebar-open'));

  const translations={
    en:{explorer:'ORGANIZATION EXPLORER',explore:'EXPLORE',platform:'DATA PLATFORM',map:'Institution Directory',sources:'Source Center',methodology:'Methodology',local:'Local-first / offline ready',independent:'Independent information platform. Not an official TNI application.',safety:'Only publicly released institutional information.',topSearch:'Search roles, units, office holders, or addresses…',install:'Install',totalNodes:'Total Nodes',currentData:'current dataset',mainUnits:'Primary Units',directBranches:'direct branches',verified:'Verified',officialEvidence:'public evidence',sourceCount:'Data Sources',recordedRefs:'recorded references',coverage:'Coverage',verifiedRecords:'Verified records',needsVerification:'Needs verification',lastUpdate:'Last dataset update',personnelTitle:'Published Personnel Strength — 2026',personnelIntro:'Active personnel totals by service are shown only when an official public figure can be verified.',viewPersonnelSources:'View official sources',personnelPending:'No verified official open total yet',personnelUnit:'Unit: active personnel · Reference year: 2026',personnelPolicyTitle:'Personnel-number policy:',personnelPolicy:'the system does not use estimates, media figures, or training intake as total service strength. A number appears only after an official 2026 source is available and verified.',search:'Search',trySearch:'Try:',allForces:'Search across all services',orgStructure:'Organization structure',expandAll:'Expand all',collapseAll:'Collapse all',treeHelp:'Use arrows to expand branches. Select a role or unit to inspect it.',selectedDetail:'SELECTED DETAIL',explorerLower:'Organization explorer',footerPolicy:'Open-source institutional information · provenance-aware',sourceCenterTitle:'Source Center',mapTitle:'Institution Directory',mapNote:'Only publicly released institutional addresses with sources are shown. No real-time movements or non-public locations.',methodTitle:'Methodology & Data Policy'},
    id:{}
  };
  let lang=localStorage.getItem('struktur-tni.lang')||'id';
  const idText=new Map([...document.querySelectorAll('[data-i18n]')].map(e=>[e.dataset.i18n,e.textContent]));
  function applyLang(){ document.documentElement.lang=lang; document.querySelectorAll('[data-i18n]').forEach(e=>{const k=e.dataset.i18n;e.textContent=lang==='en'?(translations.en[k]||idText.get(k)||e.textContent):(idText.get(k)||e.textContent)}); $('#lang-toggle').textContent=lang==='id'?'ID':'EN'; localStorage.setItem('struktur-tni.lang',lang); }
  $('#lang-toggle')?.addEventListener('click',()=>{lang=lang==='id'?'en':'id';applyLang();}); applyLang();
  let theme=localStorage.getItem('struktur-tni.theme')||'dark';
  function applyTheme(){document.documentElement.dataset.theme=theme;const tb=$('#theme-toggle');if(tb)tb.innerHTML=ICONS[theme==='dark'?'moon':'sun'];syncThemeColor();localStorage.setItem('struktur-tni.theme',theme);} $('#theme-toggle')?.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';applyTheme();});applyTheme();
  document.addEventListener('keydown',e=>{if(e.key==='/' && !/input|textarea|select/i.test(document.activeElement?.tagName)){e.preventDefault();$('#search').focus();}});
  let installPrompt=null; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#install-app').hidden=false;}); $('#install-app')?.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('#install-app').hidden=true;});
  if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('./sw.js').catch(()=>{});

  render();
})();
