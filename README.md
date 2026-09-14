# Struktur TNI — AD, AU, dan AL

Aplikasi web lokal untuk tiga matra: **TNI AD, TNI AU, dan TNI AL**, dengan tema hijau army/dark, pencarian lintas matra, struktur buka-tutup, dan editor nama pejabat. Nama folder lama dipertahankan agar lokasi aplikasi tidak berubah.

## Menjalankan

1. Jika menerima ZIP, ekstrak seluruh isinya terlebih dahulu.
2. Buka folder `struktur-tni-ad`, lalu klik dua kali **index.html** di Chrome, Edge, atau Firefox modern.
3. Aplikasi berjalan tanpa instalasi, server, akun, atau koneksi internet. Semua aset berada di folder ini. Pertahankan file-file tersebut dalam satu folder.

## Menggunakan

- Pilih **TNI AD**, **TNI AU**, atau **TNI AL** di atas navigasi.
- Tema otomatis mengikuti matra: **AD hijau army**, **AU biru langit**, **AL biru laut**. Perubahan mencakup latar, panel, garis struktur, tombol, sorotan/animasi, dan ikon tab. Pencarian lintas matra juga mengganti tema secara otomatis.
- Ketik `KASAD`, `KASAU`, `KASAL`, `KOOPSAU`, `KOARMADA RI`, `KODAERAL`, atau nama pejabat. Pencarian mencakup semua matra; hasil teratas otomatis membuka matra yang sesuai dengan animasi sorotan.
- Pilih hasil lain pada daftar saran bila ada beberapa kecocokan. Enter membuka hasil terpilih; panah atas/bawah berpindah hasil; Escape menutup saran.
- Klik panah di sebelah jabatan untuk membuka/menutup cabang. **Buka semua** dan **Tutup semua** berlaku pada struktur yang sedang ditampilkan.
- Klik jabatan untuk melihat rincian, lalu **Fokus pada struktur ini** untuk menjadikannya pangkal tampilan. Gunakan navigasi kiri/atas atau jejak struktur untuk kembali.
- Klik **Edit/Tambah nama pejabat** di panel rincian. Pada ponsel, panel rincian berada di bawah struktur.
- Animasi otomatis ditiadakan jika pengaturan sistem/browser mengaktifkan pengurangan gerakan.

## Menambah atau mengganti nama

Cara cepat: pilih jabatan → **Edit/Tambah nama pejabat** → isi pangkat dan nama → **Simpan perubahan**. Kosongkan kolom untuk menandai nama belum diisi.

Perubahan disimpan pada browser/perangkat ini dengan localStorage. Pada alamat `file://`, perilaku penyimpanan bisa berbeda antarbrowser dan dapat berubah jika folder dipindahkan, data browser dihapus, atau mode privat digunakan. Jika penyimpanan diblokir, aplikasi tetap bekerja pada sesi berjalan dan memberi pesan untuk mengekspor.

Untuk menyimpan permanen atau memindahkan data, klik **Ekspor data (.js)** lalu **Unduh data.js**. Ganti file `data.js` di folder aplikasi dengan hasil unduhan (ubah nama menjadi persis `data.js` jika browser menambahkan angka). Ekspor selalu mencakup struktur dan nama yang sedang digunakan. Jika browser pratinjau tidak mendukung unduhan, gunakan **Pilih semua teks**, salin teks tersebut, lalu simpan sebagai `data.js` melalui editor teks.

Alternatif: buka `data.js` di editor teks dan isi properti `officer` pada simpul yang diinginkan, misalnya:

```js
"wakasad": {
  label: "Wakil Kepala Staf Angkatan Darat (WAKASAD)",
  short: "WAKASAD",
  officer: "Pangkat dan Nama Pejabat",
  children: []
},
```

Jika jabatan pernah diedit melalui aplikasi, nilai lokal browser didahulukan daripada nilai di `data.js`. Untuk menggantinya, edit kembali melalui aplikasi; untuk memakai file saja, hapus penyimpanan situs/aplikasi melalui pengaturan browser (ekspor dahulu bila diperlukan).

## Menambah satuan atau jabatan

Semua data ada dalam `window.ORG_DATA.nodes` di **data.js**. Tampilan otomatis membaca data tersebut tanpa perlu mengubah `app.js`.

1. Tambahkan objek dengan ID unik di dalam `nodes`. Contoh di bawah adalah contoh pengisian, bukan nama satuan/pejabat terverifikasi:

```js
"contoh-satuan": {
  label: "Nama satuan atau jabatan baru",
  short: "SINGKATAN",
  officer: "",
  aliases: ["kata pencarian tambahan"],
  children: []
},
```

2. Masukkan ID itu ke `children` pada induk yang sesuai. Urutan ID menentukan urutan tampil:

```js
"kodam": {
  label: "KODAM",
  children: ["korem", "tempur", "contoh-satuan"]
},
```

3. Simpan file, lalu muat ulang halaman. Pastikan koma, kurung, dan tanda kutip benar. Aplikasi menampilkan pesan jika menemukan ID anak yang hilang atau hubungan melingkar.

Properti: `label` wajib; `short`, `officer`, `aliases`, `note`, dan `children` opsional. Setiap ID baru harus terhubung ke simpul root melalui `children` agar muncul dalam pencarian. Jangan menjadikan induk sebagai anak turunannya sendiri.

Satu ID boleh dipakai pada beberapa kelompok; nama pejabatnya tetap tersinkron. Kasad/Wakasad di Unsur Pimpinan menggunakan simpul `ref` sebagai rujukan ke simpul utama agar hierarki tidak melingkar. Jangan isi `children` pada simpul `ref`.

## Cakupan data awal

**Tambahan AU dan AL (15 September 2026):** AU mencakup pimpinan, tujuh Asisten Kasau, pengawasan/staf ahli, Koopsudnas, Koopsau beserta empat Grup dan empat Kosek, Kodau I–III, Korpasgat, Koharmatau, pendidikan, dan beberapa pusat. AL mencakup pimpinan, tujuh jabatan Asisten Kasal, Koarmada RI, Koarmada I–III, Kodaeral I–XIV, Kolinlamil, Marinir/Pasmar, pendidikan, dan beberapa pusat. Belum memuat seluruh Lanud/Lanal, kapal, skadron, atau jabatan bawahan.

Tautan rujukan dan tanggal sumber AU/AL tampil di panel rincian. Nama adalah catatan dari sumber tersebut, bukan pembaruan otomatis. Rujukan jabatan staf AL menggunakan dokumen organisasi 2020 dan tidak dijadikan bukti nama pejabat saat ini. Kelompok seperti “Komando / Satuan Utama” adalah pengelompokan tampilan, bukan simpul komando resmi. Sumber nama yang tersedia dan tanggalnya dicantumkan pada masing-masing simpul; nama lain kosong.

Data semua matra tetap berada di **data.js**. `forces` menentukan tombol matra, root (`kasad`, `kasau`, `kasal`), dan navigasinya. Hubungkan simpul baru ke salah satu root tersebut melalui `children`. `sourceIds` merujuk ke entri dalam `sources`. Ekspor menyertakan ketiga matra sekaligus. Penyimpanan nama AD dari versi sebelumnya tetap menggunakan kunci browser yang sama. Jangan mengganti data.js dengan ekspor versi AD lama karena tambahan AU/AL akan hilang.

**Seed AD yang dipertahankan:**

Seed mengikuti data yang ditempel pengguna: Kasad dan enam cabang utamanya, rincian Mabesad, enam staf/asisten beserta nama yang diberikan, fungsi Balakpus, Kostrad dan tiga divisi, Kopassus, Kodiklatad, pusat kecabangan, lembaga pendidikan, serta pola Kodam → Korem → Kodim → Koramil dan satuan tempur/bantuan tempur.

Nama Kasad dan enam Asisten disalin dari data pengguna; **bukan hasil verifikasi jabatan terbaru**. Jabatan yang belum memiliki nama dibiarkan kosong. Struktur adalah pengelompokan untuk eksplorasi berdasarkan seed, bukan pernyataan resmi tentang rantai komando. Kodam dan satuan kewilayahan masih berupa pola umum, bukan inventaris seluruh wilayah. Staf Latihan, Waas, dan Paban tidak ditambahkan karena tidak ada pada tempelan data akhir pengguna.

Penamaan Setumad/Denmabesad disatukan dengan nama lengkapnya. Satuan yang muncul kembali pada pengelompokan Balakpus dan daftar pusat/pendidikan memakai ID bersama jika namanya jelas sama. Direktorat dan pusat dengan nama berbeda tetap mengikuti seed sebagai simpul terpisah. Angka “simpul organisasi” menghitung ID yang terhubung, tanpa simpul rujukan; jumlah turunan menghitung ID unik dalam cabang tanpa menghitung ulang rujukan.

## Isi folder

- `index.html` — halaman aplikasi.
- `styles.css` — tampilan responsif dan animasi.
- `app.js` — pencarian, navigasi, editor, ekspor, dan validasi data.
- `data.js` — struktur dan nama pejabat; file utama untuk memperbarui data.
- `favicon.svg` — ikon tab lokal.
- `README.md` — panduan ini.

Tidak ada pustaka eksternal, analitik, permintaan jaringan, atau proses build. Editor mengubah data lokal saja dan tidak mengirimkan data ke layanan mana pun.
