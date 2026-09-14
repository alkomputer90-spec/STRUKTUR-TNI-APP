// Data organisasi TNI lokal. Alamat hanya diisi bila memiliki rujukan publik yang dapat diverifikasi.
window.ORG_DATA = {
  "version": 3,
  "root": "kasad",
  "source": "AD: seed pengguna. AU/AL: struktur awal dari sumber resmi yang dicantumkan per simpul; dibaca 15 September 2026. Kelompok tampilan bukan penetapan rantai komando.",
  "nodes": {
    "kasad": {
      "label": "Kepala Staf Angkatan Darat (KASAD)",
      "short": "KASAD",
      "officer": "Jenderal TNI Maruli Simanjuntak",
      "children": [
        "wakasad",
        "mabesad",
        "kotama",
        "pusat",
        "pendidikan",
        "wilayah"
      ],
      "aliases": [
        "TNI AD",
        "Angkatan Darat"
      ]
    },
    "wakasad": {
      "label": "Wakil Kepala Staf Angkatan Darat (WAKASAD)",
      "short": "WAKASAD",
      "officer": "",
      "children": []
    },
    "mabesad": {
      "label": "Markas Besar Angkatan Darat (MABESAD)",
      "short": "MABESAD",
      "children": [
        "pimpinan",
        "staf",
        "pengawasan",
        "ahli",
        "pelayanan",
        "balakpus"
      ],
      "address": {
        "text": "Jalan Veteran No. 5, Jakarta Pusat",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-ppid-tniad"
        ],
        "city": "Jakarta Pusat",
        "province": "DKI Jakarta"
      }
    },
    "pimpinan": {
      "label": "Unsur Pimpinan",
      "children": [
        "kasad-rujukan",
        "wakasad-rujukan"
      ]
    },
    "kasad-rujukan": {
      "label": "Kepala Staf Angkatan Darat (KASAD)",
      "short": "KASAD",
      "ref": "kasad"
    },
    "wakasad-rujukan": {
      "label": "Wakil Kepala Staf Angkatan Darat (WAKASAD)",
      "short": "WAKASAD",
      "ref": "wakasad"
    },
    "staf": {
      "label": "Unsur Pembantu Pimpinan / Staf Kasad",
      "short": "STAF KASAD",
      "children": [
        "srenad",
        "sintelad",
        "sopsad",
        "spersad",
        "slogad",
        "sterad"
      ]
    },
    "srenad": {
      "label": "Staf Perencanaan dan Anggaran (SRENAD)",
      "short": "SRENAD",
      "children": [
        "asrena"
      ]
    },
    "asrena": {
      "label": "Asisten Perencanaan dan Anggaran Kasad (Asrena Kasad)",
      "short": "ASRENA KASAD",
      "officer": "Mayjen TNI Tato Hadiyan, S.I.P.",
      "children": []
    },
    "sintelad": {
      "label": "Staf Intelijen (SINTELAD)",
      "short": "SINTELAD",
      "children": [
        "asintel"
      ]
    },
    "asintel": {
      "label": "Asisten Intelijen Kasad (Asintel Kasad)",
      "short": "ASINTEL KASAD",
      "officer": "Mayjen TNI Drajad Brima Yoga, S.I.P., M.H.",
      "children": []
    },
    "sopsad": {
      "label": "Staf Operasi (SOPSAD)",
      "short": "SOPSAD",
      "children": [
        "asops"
      ]
    },
    "asops": {
      "label": "Asisten Operasi Kasad (Asops Kasad)",
      "short": "ASOPS KASAD",
      "officer": "Mayjen TNI Aminton Manurung",
      "children": []
    },
    "spersad": {
      "label": "Staf Personel (SPERSAD)",
      "short": "SPERSAD",
      "aliases": [
        "Staf Personalia"
      ],
      "children": [
        "aspers"
      ]
    },
    "aspers": {
      "label": "Asisten Personalia Kasad (Aspers Kasad)",
      "short": "ASPERS KASAD",
      "aliases": [
        "Asisten Personel Kasad"
      ],
      "officer": "Mayjen TNI I Wayan Suarjana, S.E., M.M.",
      "children": []
    },
    "slogad": {
      "label": "Staf Logistik (SLOGAD)",
      "short": "SLOGAD",
      "children": [
        "aslog"
      ]
    },
    "aslog": {
      "label": "Asisten Logistik Kasad (Aslog Kasad)",
      "short": "ASLOG KASAD",
      "officer": "Mayjen TNI Adisura Firdaus Tarigan",
      "children": []
    },
    "sterad": {
      "label": "Staf Teritorial (STERAD)",
      "short": "STERAD",
      "children": [
        "aster"
      ]
    },
    "aster": {
      "label": "Asisten Teritorial Kasad (Aster Kasad)",
      "short": "ASTER KASAD",
      "officer": "Mayjen TNI Rachmad Zulkarnaen",
      "children": []
    },
    "pengawasan": {
      "label": "Unsur Pengawasan",
      "children": [
        "itjenad"
      ]
    },
    "itjenad": {
      "label": "Inspektorat Jenderal Angkatan Darat (Itjenad)",
      "short": "ITJENAD",
      "children": [
        "irjenad",
        "wairjenad"
      ]
    },
    "irjenad": {
      "label": "Inspektur Jenderal Angkatan Darat (Irjenad)",
      "short": "IRJENAD",
      "officer": ""
    },
    "wairjenad": {
      "label": "Wakil Inspektur Jenderal Angkatan Darat (Wairjenad)",
      "short": "WAIRJENAD",
      "officer": ""
    },
    "ahli": {
      "label": "Unsur Staf Ahli",
      "children": [
        "staf-ahli"
      ]
    },
    "staf-ahli": {
      "label": "Staf Ahli Kasad",
      "children": [
        "perwira-ahli"
      ]
    },
    "perwira-ahli": {
      "label": "Para Perwira Staf Ahli Kasad"
    },
    "pelayanan": {
      "label": "Unsur Pelayanan Mabesad",
      "children": [
        "setumad",
        "denmabesad",
        "pelayanan-lain"
      ]
    },
    "setumad": {
      "label": "Sekretariat Umum Angkatan Darat (Setumad)",
      "short": "SETUMAD"
    },
    "denmabesad": {
      "label": "Detasemen Markas Mabesad (Denmabesad)",
      "short": "DENMABESAD"
    },
    "pelayanan-lain": {
      "label": "Unsur pelayanan internal Mabesad lainnya"
    },
    "balakpus": {
      "label": "Badan Pelaksana Pusat (Balakpus)",
      "short": "BALAKPUS",
      "children": [
        "fungsi-intel",
        "fungsi-personel",
        "fungsi-logistik",
        "fungsi-komunikasi",
        "fungsi-kesehatan",
        "fungsi-hukum",
        "fungsi-penerbangan",
        "fungsi-teritorial",
        "fungsi-pemetaan",
        "fungsi-sejarah",
        "fungsi-litbang",
        "fungsi-keuangan",
        "pendidikan-pusat"
      ]
    },
    "fungsi-intel": {
      "label": "Fungsi Intelijen / Informasi",
      "children": [
        "pusintelad",
        "disinfad"
      ]
    },
    "disinfad": {
      "label": "Dinas Informasi Angkatan Darat"
    },
    "fungsi-personel": {
      "label": "Fungsi Personel",
      "children": [
        "ditajenad",
        "dispsiad",
        "disbintalad",
        "disjasad"
      ]
    },
    "ditajenad": {
      "label": "Direktorat Ajudan Jenderal Angkatan Darat"
    },
    "dispsiad": {
      "label": "Dinas Psikologi Angkatan Darat"
    },
    "disbintalad": {
      "label": "Dinas Pembinaan Mental Angkatan Darat"
    },
    "disjasad": {
      "label": "Dinas Jasmani Angkatan Darat"
    },
    "fungsi-logistik": {
      "label": "Fungsi Logistik",
      "children": [
        "ditpalad",
        "ditbekangad",
        "ditziad"
      ]
    },
    "ditpalad": {
      "label": "Direktorat Peralatan Angkatan Darat"
    },
    "ditbekangad": {
      "label": "Direktorat Perbekalan dan Angkutan Angkatan Darat"
    },
    "ditziad": {
      "label": "Direktorat Zeni Angkatan Darat"
    },
    "fungsi-komunikasi": {
      "label": "Fungsi Komunikasi / Elektronika",
      "children": [
        "dithubad",
        "disinfolahtad"
      ]
    },
    "dithubad": {
      "label": "Direktorat Perhubungan Angkatan Darat"
    },
    "disinfolahtad": {
      "label": "Dinas Informasi dan Pengolahan Data Angkatan Darat"
    },
    "fungsi-kesehatan": {
      "label": "Fungsi Kesehatan",
      "children": [
        "puskesad"
      ]
    },
    "fungsi-hukum": {
      "label": "Fungsi Hukum & Penegakan Disiplin",
      "children": [
        "ditkumad",
        "puspomad"
      ]
    },
    "ditkumad": {
      "label": "Direktorat Hukum Angkatan Darat"
    },
    "fungsi-penerbangan": {
      "label": "Fungsi Penerbangan",
      "children": [
        "puspenerbad"
      ]
    },
    "fungsi-teritorial": {
      "label": "Fungsi Teritorial",
      "children": [
        "pusterad"
      ]
    },
    "fungsi-pemetaan": {
      "label": "Fungsi Pemetaan / Geospasial",
      "children": [
        "dittopad"
      ]
    },
    "dittopad": {
      "label": "Direktorat Topografi Angkatan Darat"
    },
    "fungsi-sejarah": {
      "label": "Fungsi Sejarah",
      "children": [
        "disjarahad"
      ]
    },
    "disjarahad": {
      "label": "Dinas Sejarah Angkatan Darat"
    },
    "fungsi-litbang": {
      "label": "Fungsi Penelitian & Pengembangan",
      "children": [
        "dislitbangad"
      ]
    },
    "dislitbangad": {
      "label": "Dinas Penelitian dan Pengembangan Angkatan Darat"
    },
    "fungsi-keuangan": {
      "label": "Fungsi Keuangan",
      "children": [
        "ditkuad"
      ]
    },
    "ditkuad": {
      "label": "Direktorat Keuangan Angkatan Darat"
    },
    "pendidikan-pusat": {
      "label": "Lembaga Pendidikan Tingkat Pusat",
      "children": [
        "akmil",
        "seskoad",
        "secapa"
      ]
    },
    "kotama": {
      "label": "Kotama / Satuan Utama",
      "short": "KOTAMA",
      "children": [
        "kostrad",
        "kopassus",
        "kodiklatad"
      ]
    },
    "kostrad": {
      "label": "KOSTRAD",
      "children": [
        "divif-1",
        "divif-2",
        "divif-3"
      ]
    },
    "divif-1": {
      "label": "Divisi Infanteri 1/Kostrad",
      "short": "DIVIF 1"
    },
    "divif-2": {
      "label": "Divisi Infanteri 2/Kostrad",
      "short": "DIVIF 2"
    },
    "divif-3": {
      "label": "Divisi Infanteri 3/Kostrad",
      "short": "DIVIF 3"
    },
    "kopassus": {
      "label": "KOPASSUS"
    },
    "kodiklatad": {
      "label": "KODIKLATAD"
    },
    "pusat": {
      "label": "Pusat Kecabangan / Badan Pelaksana",
      "short": "PUSAT KECABANGAN",
      "aliases": [
        "Pusat Kecabangan Balakpus"
      ],
      "children": [
        "pussenif",
        "pussenkav",
        "pussenarmed",
        "pussenarhanud",
        "pusterad",
        "puspomad",
        "puspenerbad",
        "pusziad",
        "pushubad",
        "puspalad",
        "pusbekangad",
        "pusintelad",
        "pussansiad",
        "puskesad"
      ]
    },
    "pussenif": {
      "label": "Pussenif"
    },
    "pussenkav": {
      "label": "Pussenkav"
    },
    "pussenarmed": {
      "label": "Pussenarmed"
    },
    "pussenarhanud": {
      "label": "Pussenarhanud"
    },
    "pusterad": {
      "label": "Pusat Teritorial Angkatan Darat (Pusterad)",
      "short": "PUSTERAD",
      "address": {
        "text": "Jl. Setu, Cipayung, Jakarta Timur",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-pusterad"
        ],
        "city": "Jakarta Timur",
        "province": "DKI Jakarta"
      }
    },
    "puspomad": {
      "label": "Pusat Polisi Militer Angkatan Darat (Puspomad)",
      "short": "PUSPOMAD",
      "address": {
        "text": "Jl. Merdeka Timur No. 17, Jakarta Pusat 10110",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-puspomad"
        ],
        "city": "Jakarta Pusat",
        "province": "DKI Jakarta",
        "postalCode": "10110"
      }
    },
    "puspenerbad": {
      "label": "Pusat Penerbangan Angkatan Darat (Puspenerbad)",
      "short": "PUSPENERBAD"
    },
    "pusziad": {
      "label": "Pusziad"
    },
    "pushubad": {
      "label": "Pushubad"
    },
    "puspalad": {
      "label": "Puspalad"
    },
    "pusbekangad": {
      "label": "Pusbekangad"
    },
    "pusintelad": {
      "label": "Pusat Intelijen Angkatan Darat (Pusintelad)",
      "short": "PUSINTELAD"
    },
    "pussansiad": {
      "label": "Pussansiad"
    },
    "puskesad": {
      "label": "Pusat Kesehatan Angkatan Darat (Puskesad)",
      "short": "PUSKESAD"
    },
    "pendidikan": {
      "label": "Lembaga Pendidikan",
      "children": [
        "akmil",
        "seskoad",
        "secapa"
      ]
    },
    "akmil": {
      "label": "Akademi Militer (Akmil)",
      "short": "AKMIL",
      "address": {
        "text": "Kompleks Akademi Militer, Magelang, Jawa Tengah",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-akmil"
        ],
        "city": "Magelang",
        "province": "Jawa Tengah",
        "note": "Situs resmi memastikan lokasi Akmil di Kota Magelang; halaman lokasi tidak mencantumkan nomor jalan."
      }
    },
    "seskoad": {
      "label": "Sekolah Staf dan Komando Angkatan Darat (Seskoad)",
      "short": "SESKOAD",
      "address": {
        "text": "Jl. Gatot Subroto No. 96, Bandung, Jawa Barat 40263",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-seskoad"
        ],
        "city": "Bandung",
        "province": "Jawa Barat",
        "postalCode": "40263"
      }
    },
    "secapa": {
      "label": "Sekolah Calon Perwira Angkatan Darat (Secapa AD)",
      "short": "SECAPA AD",
      "aliases": [
        "Secapaad"
      ],
      "address": {
        "text": "Jl. Hegarmanah No. 152, Hegarmanah, Kec. Cidadap, Kota Bandung, Jawa Barat 40141",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-secapaad"
        ],
        "city": "Bandung",
        "province": "Jawa Barat",
        "postalCode": "40141"
      }
    },
    "wilayah": {
      "label": "Komando Kewilayahan",
      "children": [
        "kodam"
      ]
    },
    "kodam": {
      "label": "KODAM",
      "children": [
        "korem",
        "tempur"
      ],
      "note": "Pola jenjang umum dari data pengguna; belum memuat daftar Kodam dan satuan per wilayah."
    },
    "korem": {
      "label": "Korem",
      "children": [
        "kodim"
      ]
    },
    "kodim": {
      "label": "Kodim",
      "children": [
        "koramil"
      ]
    },
    "koramil": {
      "label": "Koramil"
    },
    "tempur": {
      "label": "Satuan Tempur / Bantuan Tempur",
      "children": [
        "brigif",
        "yonif",
        "yonkav",
        "yonarmed",
        "yonarhanud",
        "yonzipur",
        "satuan-lain"
      ]
    },
    "brigif": {
      "label": "Brigif"
    },
    "yonif": {
      "label": "Yonif"
    },
    "yonkav": {
      "label": "Yonkav"
    },
    "yonarmed": {
      "label": "Yonarmed"
    },
    "yonarhanud": {
      "label": "Yonarhanud"
    },
    "yonzipur": {
      "label": "Yonzipur"
    },
    "satuan-lain": {
      "label": "Satuan lainnya"
    },
    "kasau": {
      "label": "Kepala Staf Angkatan Udara (KASAU)",
      "officer": "Marsekal TNI M. Tonny Harjono, S.E., M.M.",
      "children": [
        "wakasau",
        "mabesau",
        "au-komando",
        "au-pendidikan",
        "au-pusat"
      ],
      "short": "KASAU",
      "aliases": [
        "TNI AU",
        "Angkatan Udara"
      ],
      "sourceIds": [
        "au-pejabat"
      ],
      "note": "Struktur awal matra udara. Kelompok Mabesau, komando, pendidikan, dan pusat adalah penyajian ringkas; belum mencakup seluruh satuan."
    },
    "wakasau": {
      "label": "Wakil Kepala Staf Angkatan Udara (WAKASAU)",
      "officer": "Marsekal Madya TNI Ir. Tedi Rizalihadi S., M.M.",
      "children": [],
      "short": "WAKASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "mabesau": {
      "label": "Markas Besar Angkatan Udara (MABESAU)",
      "officer": "",
      "children": [
        "au-staf",
        "au-pengawasan",
        "au-ahli",
        "au-pelayanan"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-pejabat"
      ],
      "address": {
        "text": "Mabes TNI Cilangkap, Jakarta Timur",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-ppid-tniad"
        ],
        "city": "Jakarta Timur",
        "province": "DKI Jakarta"
      }
    },
    "au-staf": {
      "label": "Unsur Pembantu Pimpinan / Staf Kasau",
      "officer": "",
      "children": [
        "au-asrena",
        "au-asintel",
        "au-asops",
        "au-aspers",
        "au-aslog",
        "au-aspotdirga",
        "au-askomlek"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-asrena": {
      "label": "Asisten Perencanaan dan Anggaran Kasau (ASRENA KASAU)",
      "officer": "Marsekal Muda TNI Ian Fuady",
      "children": [],
      "short": "ASRENA KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-asintel": {
      "label": "Asisten Intelijen Kasau (ASINTEL KASAU)",
      "officer": "Marsekal Muda TNI Jatmiko Adi",
      "children": [],
      "short": "ASINTEL KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-asops": {
      "label": "Asisten Operasi Kasau (ASOPS KASAU)",
      "officer": "Marsekal Muda TNI Suliono, S.Sos.",
      "children": [],
      "short": "ASOPS KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-aspers": {
      "label": "Asisten Personel Kasau (ASPERS KASAU)",
      "officer": "Marsekal Muda TNI Yostariza, S.E., M.Tr.Opsla.",
      "children": [],
      "short": "ASPERS KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-aslog": {
      "label": "Asisten Logistik Kasau (ASLOG KASAU)",
      "officer": "Marsekal Muda TNI Nur Surachman W., S.E., M.M.",
      "children": [],
      "short": "ASLOG KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-aspotdirga": {
      "label": "Asisten Potensi Dirgantara Kasau (ASPOTDIRGA KASAU)",
      "officer": "Marsekal Muda TNI Palito Sitorus, S.IP., M.M.",
      "children": [],
      "short": "ASPOTDIRGA KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-askomlek": {
      "label": "Asisten Komunikasi dan Elektronika Kasau (ASKOMLEK KASAU)",
      "officer": "Marsekal Muda TNI Deni Hasoloan S.",
      "children": [],
      "short": "ASKOMLEK KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-pengawasan": {
      "label": "Unsur Pengawasan",
      "officer": "",
      "children": [
        "au-irjen"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-irjen": {
      "label": "Inspektur Jenderal Angkatan Udara (IRJENAU)",
      "officer": "Marsekal Madya TNI Arif Widianto",
      "children": [],
      "short": "IRJENAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-ahli": {
      "label": "Unsur Staf Ahli",
      "officer": "",
      "children": [
        "au-koorsahli"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-koorsahli": {
      "label": "Koordinator Staf Ahli Kasau",
      "officer": "Marsekal Muda TNI Andi Wijaya, S.Sos.",
      "children": [],
      "short": "KOORSAHLI KASAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-pelayanan": {
      "label": "Unsur Pelayanan Mabesau",
      "officer": "",
      "children": [
        "au-denma"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-denma": {
      "label": "Komandan Detasemen Markas Besar TNI AU (Dandenmabesau)",
      "officer": "Marsekal Pertama TNI Benny Bayu Nirwan, S.T., M.Han.",
      "children": [],
      "short": "DANDENMABESAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-komando": {
      "label": "Komando / Satuan Utama TNI AU",
      "officer": "",
      "children": [
        "au-koopsudnas",
        "au-koopsau",
        "au-kodau",
        "au-korpasgat",
        "au-koharmatau"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-kotama"
      ]
    },
    "au-koopsudnas": {
      "label": "Komando Operasi Udara Nasional (KOOPSUDNAS)",
      "officer": "Marsekal Madya TNI Minggit Tribowo, S.I.P.",
      "children": [],
      "short": "KOOPSUDNAS",
      "sourceIds": [
        "au-panglima"
      ],
      "note": "Pada tampilan ini, Koopsau dan Kodau ditampilkan dalam kelompok komando yang sama agar mudah ditemukan. Pengelompokan tidak menyatakan keduanya terpisah secara operasional dari Koopsudnas."
    },
    "au-koopsau": {
      "label": "Komando Operasi TNI Angkatan Udara (KOOPSAU)",
      "officer": "Marsekal Muda TNI Djoko Hadipurwanto, S.E., M.M.",
      "children": [
        "au-grup-1",
        "au-grup-2",
        "au-grup-3",
        "au-grup-4",
        "au-kosek-1",
        "au-kosek-2",
        "au-kosek-3",
        "au-kosek-4"
      ],
      "short": "KOOPSAU",
      "sourceIds": [
        "au-grup",
        "au-panglima"
      ]
    },
    "au-grup-1": {
      "label": "Grup 1 Angkut",
      "officer": "",
      "children": [],
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-grup-2": {
      "label": "Grup 2 Helikopter",
      "officer": "",
      "children": [],
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-grup-3": {
      "label": "Grup 3 Tempur",
      "officer": "",
      "children": [],
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-grup-4": {
      "label": "Grup 4 Khusus",
      "officer": "",
      "children": [],
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-kosek-1": {
      "label": "Komando Sektor I (KOSEK I)",
      "officer": "",
      "children": [],
      "short": "KOSEK I",
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-kosek-2": {
      "label": "Komando Sektor II (KOSEK II)",
      "officer": "",
      "children": [],
      "short": "KOSEK II",
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-kosek-3": {
      "label": "Komando Sektor III (KOSEK III)",
      "officer": "",
      "children": [],
      "short": "KOSEK III",
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-kosek-4": {
      "label": "Komando Sektor IV (KOSEK IV)",
      "officer": "",
      "children": [],
      "short": "KOSEK IV",
      "sourceIds": [
        "au-grup"
      ]
    },
    "au-kodau": {
      "label": "Komando Daerah TNI AU (KODAU)",
      "officer": "",
      "children": [
        "au-kodau-1",
        "au-kodau-2",
        "au-kodau-3"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-kotama",
        "au-kodau"
      ]
    },
    "au-kodau-1": {
      "label": "Komando Daerah TNI Angkatan Udara I (KODAU I)",
      "officer": "",
      "children": [],
      "short": "KODAU I",
      "sourceIds": [
        "au-kotama"
      ],
      "note": "Daftar Lanud per Kodau belum dimasukkan."
    },
    "au-kodau-2": {
      "label": "Komando Daerah TNI Angkatan Udara II (KODAU II)",
      "officer": "",
      "children": [],
      "short": "KODAU II",
      "sourceIds": [
        "au-kotama"
      ],
      "note": "Daftar Lanud per Kodau belum dimasukkan."
    },
    "au-kodau-3": {
      "label": "Komando Daerah TNI Angkatan Udara III (KODAU III)",
      "officer": "",
      "children": [],
      "short": "KODAU III",
      "sourceIds": [
        "au-kotama"
      ],
      "note": "Daftar Lanud per Kodau belum dimasukkan."
    },
    "au-korpasgat": {
      "label": "Korps Pasukan Gerak Cepat (KORPASGAT)",
      "officer": "",
      "children": [],
      "short": "KORPASGAT",
      "aliases": [
        "Kopasgat",
        "Paskhas"
      ],
      "sourceIds": [
        "au-kotama",
        "au-pusat"
      ]
    },
    "au-koharmatau": {
      "label": "Komando Pemeliharaan Materiel TNI AU (KOHARMATAU)",
      "officer": "",
      "children": [],
      "short": "KOHARMATAU",
      "sourceIds": [
        "au-kotama"
      ]
    },
    "au-pendidikan": {
      "label": "Pendidikan dan Latihan TNI AU",
      "officer": "",
      "children": [
        "au-kodiklatau",
        "au-aau",
        "au-seskoau"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-kotama"
      ]
    },
    "au-kodiklatau": {
      "label": "Kodiklatau",
      "officer": "",
      "children": [],
      "short": "KODIKLATAU",
      "sourceIds": [
        "au-kotama"
      ]
    },
    "au-aau": {
      "label": "Akademi Angkatan Udara (AAU)",
      "officer": "",
      "children": [],
      "short": "AAU",
      "sourceIds": [
        "au-pusat"
      ],
      "address": {
        "text": "Jl. Raya Solo - Yogyakarta, Maredan/Mereden, Sendangtirto, Kec. Kalasan, Kabupaten Sleman, DI Yogyakarta 55281",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-aau"
        ],
        "city": "Sleman",
        "province": "DI Yogyakarta",
        "postalCode": "55281"
      }
    },
    "au-seskoau": {
      "label": "Sekolah Staf dan Komando Angkatan Udara (SESKOAU)",
      "officer": "",
      "children": [],
      "short": "SESKOAU",
      "sourceIds": [
        "au-pusat"
      ]
    },
    "au-pusat": {
      "label": "Pusat / Badan Pelaksana TNI AU",
      "officer": "",
      "children": [
        "au-laiklambangja",
        "au-kesehatan"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "au-pejabat",
        "au-pusat"
      ]
    },
    "au-laiklambangja": {
      "label": "Kapuslaiklambangjaau",
      "officer": "Marsekal Muda TNI Fakhrizet, S.Sos.",
      "children": [],
      "short": "KAPUSLAIKLAMBANGJAAU",
      "sourceIds": [
        "au-pejabat"
      ]
    },
    "au-kesehatan": {
      "label": "Pusat Kesehatan TNI AU (PUSKESAU)",
      "officer": "",
      "children": [],
      "short": "PUSKESAU",
      "sourceIds": [
        "au-pusat"
      ]
    },
    "kasal": {
      "label": "Kepala Staf Angkatan Laut (KASAL)",
      "officer": "Laksamana TNI Dr. Muhammad Ali",
      "children": [
        "wakasal",
        "mabesal",
        "al-komando",
        "al-pendidikan",
        "al-pusat"
      ],
      "short": "KASAL",
      "aliases": [
        "TNI AL",
        "Angkatan Laut"
      ],
      "sourceIds": [
        "al-kasal"
      ],
      "note": "Struktur awal matra laut. Kelompok Mabesal, komando, pendidikan, dan pusat adalah penyajian ringkas; belum mencakup seluruh satuan."
    },
    "wakasal": {
      "label": "Wakil Kepala Staf Angkatan Laut (WAKASAL)",
      "officer": "",
      "children": [],
      "short": "WAKASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "mabesal": {
      "label": "Markas Besar Angkatan Laut (MABESAL)",
      "officer": "",
      "children": [
        "al-staf",
        "al-pengawasan",
        "al-ahli"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-unsur"
      ],
      "address": {
        "text": "Mabes TNI Cilangkap, Jakarta Timur",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-ppid-tniad"
        ],
        "city": "Jakarta Timur",
        "province": "DKI Jakarta"
      }
    },
    "al-staf": {
      "label": "Unsur Pembantu Pimpinan / Staf Kasal",
      "officer": "",
      "children": [
        "al-asrena",
        "al-asintel",
        "al-asops",
        "al-aspers",
        "al-aslog",
        "al-aspotmar",
        "al-askomlek"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-asrena": {
      "label": "Asisten Perencanaan dan Anggaran Kasal (ASRENA KASAL)",
      "officer": "",
      "children": [],
      "short": "ASRENA KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-asintel": {
      "label": "Asisten Intelijen Kasal (ASINTEL KASAL)",
      "officer": "",
      "children": [],
      "short": "ASINTEL KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-asops": {
      "label": "Asisten Operasi Kasal (ASOPS KASAL)",
      "officer": "",
      "children": [],
      "short": "ASOPS KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-aspers": {
      "label": "Asisten Personel Kasal (ASPERS KASAL)",
      "officer": "",
      "children": [],
      "short": "ASPERS KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-aslog": {
      "label": "Asisten Logistik Kasal (ASLOG KASAL)",
      "officer": "",
      "children": [],
      "short": "ASLOG KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-aspotmar": {
      "label": "Asisten Potensi Maritim Kasal (ASPOTMAR KASAL)",
      "officer": "",
      "children": [],
      "short": "ASPOTMAR KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-askomlek": {
      "label": "Asisten Komunikasi dan Elektronika Kasal (ASKOMLEK KASAL)",
      "officer": "Laksamana Muda TNI Dwi Cahyo Kuncoro, M.Eng., M.Tr.Opsla.",
      "children": [],
      "short": "ASKOMLEK KASAL",
      "sourceIds": [
        "al-komlek"
      ]
    },
    "al-pengawasan": {
      "label": "Unsur Pengawasan",
      "officer": "",
      "children": [
        "al-irjen"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-irjen": {
      "label": "Inspektur Jenderal Angkatan Laut (IRJENAL)",
      "officer": "",
      "children": [],
      "short": "IRJENAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-ahli": {
      "label": "Unsur Staf Ahli",
      "officer": "",
      "children": [
        "al-koorsahli"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-koorsahli": {
      "label": "Koordinator Staf Ahli Kasal",
      "officer": "",
      "children": [],
      "short": "KOORSAHLI KASAL",
      "sourceIds": [
        "al-unsur"
      ]
    },
    "al-komando": {
      "label": "Komando / Satuan Utama TNI AL",
      "officer": "",
      "children": [
        "al-koarmadari",
        "al-kolinlamil",
        "al-marinir"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-kotama"
      ]
    },
    "al-koarmadari": {
      "label": "Komando Armada Republik Indonesia (KOARMADA RI)",
      "officer": "Laksamana Madya TNI Dr. Denih Hendrata, S.E., M.M.",
      "children": [
        "al-koarmada-1",
        "al-koarmada-2",
        "al-koarmada-3",
        "al-kodaeral"
      ],
      "short": "KOARMADA RI",
      "sourceIds": [
        "al-armada",
        "al-panglima"
      ]
    },
    "al-koarmada-1": {
      "label": "Komando Armada I (KOARMADA I)",
      "officer": "",
      "children": [],
      "short": "KOARMADA I",
      "sourceIds": [
        "al-armada"
      ]
    },
    "al-koarmada-2": {
      "label": "Komando Armada II (KOARMADA II)",
      "officer": "",
      "children": [],
      "short": "KOARMADA II",
      "sourceIds": [
        "al-armada"
      ]
    },
    "al-koarmada-3": {
      "label": "Komando Armada III (KOARMADA III)",
      "officer": "",
      "children": [],
      "short": "KOARMADA III",
      "sourceIds": [
        "al-armada"
      ],
      "address": {
        "text": "Markas Koarmada III, Katapop, Distrik Salawati, Kabupaten Sorong, Papua Barat Daya",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-koarmada3"
        ],
        "city": "Kabupaten Sorong",
        "province": "Papua Barat Daya",
        "note": "Situs resmi Koarmada III juga masih menampilkan alamat lama Jl. Bubara No. 1 pada footer; berita resmi menyebut markas telah berpindah ke Katapop sejak 16 November 2020."
      }
    },
    "al-kodaeral": {
      "label": "Komando Daerah TNI AL (KODAERAL)",
      "officer": "",
      "children": [
        "al-kodaeral-1",
        "al-kodaeral-2",
        "al-kodaeral-3",
        "al-kodaeral-4",
        "al-kodaeral-5",
        "al-kodaeral-6",
        "al-kodaeral-7",
        "al-kodaeral-8",
        "al-kodaeral-9",
        "al-kodaeral-10",
        "al-kodaeral-11",
        "al-kodaeral-12",
        "al-kodaeral-13",
        "al-kodaeral-14"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-armada"
      ]
    },
    "al-kodaeral-1": {
      "label": "Komando Daerah TNI Angkatan Laut I (KODAERAL I)",
      "officer": "",
      "children": [],
      "short": "KODAERAL I",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-2": {
      "label": "Komando Daerah TNI Angkatan Laut II (KODAERAL II)",
      "officer": "",
      "children": [],
      "short": "KODAERAL II",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-3": {
      "label": "Komando Daerah TNI Angkatan Laut III (KODAERAL III)",
      "officer": "",
      "children": [],
      "short": "KODAERAL III",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-4": {
      "label": "Komando Daerah TNI Angkatan Laut IV (KODAERAL IV)",
      "officer": "",
      "children": [],
      "short": "KODAERAL IV",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-5": {
      "label": "Komando Daerah TNI Angkatan Laut V (KODAERAL V)",
      "officer": "",
      "children": [],
      "short": "KODAERAL V",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-6": {
      "label": "Komando Daerah TNI Angkatan Laut VI (KODAERAL VI)",
      "officer": "",
      "children": [],
      "short": "KODAERAL VI",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-7": {
      "label": "Komando Daerah TNI Angkatan Laut VII (KODAERAL VII)",
      "officer": "",
      "children": [],
      "short": "KODAERAL VII",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-8": {
      "label": "Komando Daerah TNI Angkatan Laut VIII (KODAERAL VIII)",
      "officer": "",
      "children": [],
      "short": "KODAERAL VIII",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-9": {
      "label": "Komando Daerah TNI Angkatan Laut IX (KODAERAL IX)",
      "officer": "",
      "children": [],
      "short": "KODAERAL IX",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-10": {
      "label": "Komando Daerah TNI Angkatan Laut X (KODAERAL X)",
      "officer": "",
      "children": [],
      "short": "KODAERAL X",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-11": {
      "label": "Komando Daerah TNI Angkatan Laut XI (KODAERAL XI)",
      "officer": "",
      "children": [],
      "short": "KODAERAL XI",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-12": {
      "label": "Komando Daerah TNI Angkatan Laut XII (KODAERAL XII)",
      "officer": "",
      "children": [],
      "short": "KODAERAL XII",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-13": {
      "label": "Komando Daerah TNI Angkatan Laut XIII (KODAERAL XIII)",
      "officer": "",
      "children": [],
      "short": "KODAERAL XIII",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kodaeral-14": {
      "label": "Komando Daerah TNI Angkatan Laut XIV (KODAERAL XIV)",
      "officer": "",
      "children": [],
      "short": "KODAERAL XIV",
      "sourceIds": [
        "al-armada"
      ],
      "note": "Daftar Lanal per Kodaeral belum dimasukkan."
    },
    "al-kolinlamil": {
      "label": "Komando Lintas Laut Militer (KOLINLAMIL)",
      "officer": "",
      "children": [],
      "short": "KOLINLAMIL",
      "sourceIds": [
        "al-kotama"
      ],
      "address": {
        "text": "Jl. Pelabuhan Tanjung Priok, RW.1, Tanjung Priok, Kec. Koja, Jakarta Utara 14310",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-kolinlamil"
        ],
        "city": "Jakarta Utara",
        "province": "DKI Jakarta",
        "postalCode": "14310"
      }
    },
    "al-marinir": {
      "label": "Korps Marinir (KORMAR)",
      "officer": "",
      "children": [
        "al-pasmar-1",
        "al-pasmar-2",
        "al-pasmar-3"
      ],
      "short": "KORMAR",
      "aliases": [
        "Marinir"
      ],
      "sourceIds": [
        "al-kotama",
        "al-pasmar"
      ],
      "address": {
        "text": "Jl. Prajurit KKO Usman dan Harun No. 32, Senen, Jakarta Pusat 10410",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-kormar"
        ],
        "city": "Jakarta Pusat",
        "province": "DKI Jakarta",
        "postalCode": "10410"
      }
    },
    "al-pasmar-1": {
      "label": "Pasukan Marinir 1 (PASMAR 1)",
      "officer": "",
      "children": [],
      "short": "PASMAR 1",
      "sourceIds": [
        "al-pasmar"
      ],
      "address": {
        "text": "Jl. Cilincing Landak, RT.3/RW.2, Marunda, Kec. Cilincing, Jakarta Utara 14150",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-pasmar1"
        ],
        "city": "Jakarta Utara",
        "province": "DKI Jakarta",
        "postalCode": "14150"
      }
    },
    "al-pasmar-2": {
      "label": "Pasukan Marinir 2 (PASMAR 2)",
      "officer": "",
      "children": [],
      "short": "PASMAR 2",
      "sourceIds": [
        "al-pasmar"
      ],
      "address": {
        "text": "Kesatrian Marinir Moekijat, Jl. A. Yani No. 1A, Gedangan, Sidoarjo, Jawa Timur",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-pasmar2"
        ],
        "city": "Sidoarjo",
        "province": "Jawa Timur"
      }
    },
    "al-pasmar-3": {
      "label": "Pasukan Marinir 3 (PASMAR 3)",
      "officer": "",
      "children": [],
      "short": "PASMAR 3",
      "sourceIds": [
        "al-pasmar"
      ],
      "address": {
        "text": "Kesatrian Marinir Agoes Soebekti, Jl. Sorong-Klamono Km. 16, Distrik Klaurung, Kota Sorong, Papua Barat Daya",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-pasmar3"
        ],
        "city": "Kota Sorong",
        "province": "Papua Barat Daya"
      }
    },
    "al-pendidikan": {
      "label": "Pendidikan dan Latihan TNI AL",
      "officer": "",
      "children": [
        "al-kodiklatal",
        "al-aal",
        "al-seskoal"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-kotama"
      ]
    },
    "al-kodiklatal": {
      "label": "Kodiklatal",
      "officer": "",
      "children": [],
      "short": "KODIKLATAL",
      "sourceIds": [
        "al-kotama",
        "al-kasal"
      ]
    },
    "al-aal": {
      "label": "Akademi Angkatan Laut (AAL)",
      "officer": "",
      "children": [],
      "short": "AAL",
      "sourceIds": [
        "al-kotama"
      ]
    },
    "al-seskoal": {
      "label": "Sekolah Staf dan Komando Angkatan Laut (SESKOAL)",
      "officer": "",
      "children": [],
      "short": "SESKOAL",
      "sourceIds": [
        "al-kotama"
      ],
      "address": {
        "text": "Seskoal, Cipulir, Kebayoran Lama, Jakarta Selatan",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-seskoal"
        ],
        "city": "Jakarta Selatan",
        "province": "DKI Jakarta",
        "note": "Sumber resmi 2026 menegaskan lokasi Seskoal di Cipulir, Kebayoran Lama; nomor jalan tidak dicantumkan pada sumber yang diverifikasi."
      }
    },
    "al-pusat": {
      "label": "Pusat / Badan Pelaksana TNI AL",
      "officer": "",
      "children": [
        "al-pushidrosal",
        "al-puspenerbal",
        "al-puspomal"
      ],
      "note": "Kelompok tampilan untuk eksplorasi; bukan nama satuan atau penetapan rantai komando operasional.",
      "sourceIds": [
        "al-kotama",
        "al-pom"
      ]
    },
    "al-pushidrosal": {
      "label": "Pusat Hidro-Oseanografi TNI AL (PUSHIDROSAL)",
      "officer": "",
      "children": [],
      "short": "PUSHIDROSAL",
      "sourceIds": [
        "al-kotama"
      ],
      "address": {
        "text": "Jl. Pantai Kuta V No. 1, Ancol Timur, Jakarta Utara 14430",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-pushidrosal"
        ],
        "city": "Jakarta Utara",
        "province": "DKI Jakarta",
        "postalCode": "14430"
      }
    },
    "al-puspenerbal": {
      "label": "Pusat Penerbangan TNI AL (PUSPENERBAL)",
      "officer": "Laksamana Muda TNI Bayu Alisyahbana",
      "children": [
        "al-wing-2"
      ],
      "short": "PUSPENERBAL",
      "sourceIds": [
        "al-penerbal"
      ],
      "address": {
        "text": "Jl. Juanda, Sedati, Sidoarjo, Jawa Timur",
        "status": "Sumber resmi",
        "verified": "2026-09-15",
        "sourceIds": [
          "addr-puspenerbal"
        ],
        "city": "Sidoarjo",
        "province": "Jawa Timur"
      }
    },
    "al-wing-2": {
      "label": "Wing Udara 2 Puspenerbal",
      "officer": "",
      "children": [],
      "sourceIds": [
        "al-penerbal"
      ],
      "note": "Contoh satuan yang tercantum pada sumber; belum merupakan daftar seluruh jajaran Puspenerbal."
    },
    "al-puspomal": {
      "label": "Pusat Polisi Militer TNI AL (PUSPOMAL)",
      "officer": "",
      "children": [],
      "short": "PUSPOMAL",
      "sourceIds": [
        "al-pom"
      ]
    }
  },
  "sources": {
    "au-pejabat": {
      "title": "Pejabat TNI AU",
      "url": "https://tni-au.mil.id/tentang-kami/pejabat",
      "published": null,
      "accessed": "2026-09-15"
    },
    "au-kotama": {
      "title": "Daftar peserta Kotama TNI AU, 20 Agustus 2026",
      "url": "https://www.tni-au.mil.id/berita/detail/koharmatau-asah-wawasan-tim-cerdas-cermat-adu-pengetahuan-kebangsaan-dan-kejuangan-tni-au",
      "published": "2026-08-20",
      "accessed": "2026-09-15"
    },
    "au-grup": {
      "title": "Jajaran Grup dan Kosek Koopsau",
      "url": "https://tni-au.mil.id/berita/detail/kaskoopsudnas-buka-latihan-matra-udara-ii-koopsau-brahmastra-perkasa-ta-2026",
      "published": "2026-05-18",
      "accessed": "2026-09-15"
    },
    "au-panglima": {
      "title": "Pangkoopsudnas dan Pangkoopsau, 10 Juli 2026",
      "url": "https://tni-au.mil.id/index.php/berita/detail/pangkoopsudnas-resmi-tutup-latihan-matra-udara-ii-koopsau-brahmastra-perkasa-ta-2026",
      "published": "2026-07-10",
      "accessed": "2026-09-15"
    },
    "au-kodau": {
      "title": "Perubahan Koopsud I menjadi Kodau I",
      "url": "https://tni-au.mil.id/berita/detail/pangkodau-i-buka-rakernis-kodau-i-ta-2026",
      "published": "2026-02-18",
      "accessed": "2026-09-15"
    },
    "au-pusat": {
      "title": "Pejabat dan satuan peserta PORAU 2026",
      "url": "https://tni-au.mil.id/index.php/berita/detail/kontingen-seskoau-ikuti-pembukaan-pekan-olahraga-tni-au-ta-2026",
      "published": "2026-06-29",
      "accessed": "2026-09-15"
    },
    "al-kasal": {
      "title": "Kasal pada pembekalan Diktukpa TNI AL",
      "url": "https://www.tnial.mil.id/berita/91597/KOMANDAN-KODAERAL-V-HADIRI-PEMBEKALAN-KASAL-KEPADA-PASIS-DIKTUKPA-TNI-AL-ANGKATAN-LV-TA-2026/",
      "published": "2026-07-09",
      "accessed": "2026-09-15"
    },
    "al-unsur": {
      "title": "Pejabat dalam dokumen organisasi TNI AL (rujukan 2020)",
      "url": "https://diskumal.tnial.mil.id/fileregulasi/regulasi-20210831-124717.pdf",
      "published": "2020-10-16",
      "accessed": "2026-09-15"
    },
    "al-armada": {
      "title": "Jajaran Koarmada RI dan Kodaeral I–XIV",
      "url": "https://koarmada3.tnial.mil.id/berita/16069/TINGKATKAN-KEIMANAN-DAN-KETAKWAAN%2C-KOARMADA-III-IKUTI-KAUSERI-AGAMA-TERPUSAT-KOARMADA-RI-OLEH-KODAERAL-VIII-MELALUI-VIRTUAL/",
      "published": "2026-08-06",
      "accessed": "2026-09-15"
    },
    "al-kotama": {
      "title": "Perwakilan satuan pada Tamtama Teladan 2026",
      "url": "https://diswatpersal.tnial.mil.id/detail-berita/kadiswatpersal-pimpin-pembukaan-tamtama-teladan-tni-angkatan-laut-tahun-2026",
      "published": null,
      "accessed": "2026-09-15"
    },
    "al-pasmar": {
      "title": "Peserta asistensi Rengiat RKA 2026",
      "url": "https://www.tnial.mil.id/berita/86892/TNI-AL-BUKA-ASISTENSI-DAN-PENELAAHAN-RENGIAT-RKA-TAHUN-2026/",
      "published": "2025-10-21",
      "accessed": "2026-09-15"
    },
    "al-komlek": {
      "title": "Askomlek Kasal, Juli 2026",
      "url": "https://www.tnial.mil.id/berita/91990/ASKOMLEK-KASAL-TINJAU-KESIAPAN-UNSUR-LATIHAN-TERINTEGRASI-TNI-2026/",
      "published": "2026-07-29",
      "accessed": "2026-09-15"
    },
    "al-penerbal": {
      "title": "Danpuspenerbal dan Wing Udara 2",
      "url": "https://www.tnial.mil.id/berita/92020/KOMANDAN-PUSPENERBAL-TERIMA-KUNJUNGAN-KERJA-ASKOMLEK-KASAL/",
      "published": "2026-07-30",
      "accessed": "2026-09-15"
    },
    "al-panglima": {
      "title": "Pangkoarmada RI pada PORAL 2026",
      "url": "https://www.tnial.mil.id/berita/91588/PRAJURIT-KODAERAL-XII-PERKUAT-KONTINGEN-KOARMADA-RI-DI-AJANG-PORAL-TNI-AL-2026/",
      "published": "2026-07-09",
      "accessed": "2026-09-15"
    },
    "al-pom": {
      "title": "Puspom TNI AL pada Kasal Cup 2026",
      "url": "https://www.tnial.mil.id/berita/90528/PRAJURIT-LANAL-YOGYAKARTA-LAKSANAKAN-LATIHAN-PERAN-TEMPUR-BAHAYA-UMUM/",
      "published": "2026-05-20",
      "accessed": "2026-09-15"
    },
    "addr-ppid-tniad": {
      "title": "PPID TNI AD — Simpul Layanan",
      "url": "https://ppid.tniad.mil.id/simpul-layanan",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-seskoad": {
      "title": "Seskoad — situs resmi",
      "url": "https://seskoad.mil.id/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-secapaad": {
      "title": "Secapa AD — Kontak",
      "url": "https://secapaad.mil.id/kontak/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-pusterad": {
      "title": "PPID TNI AD — kegiatan di Mapusterad",
      "url": "https://ppid.tniad.mil.id/index.php/i/39013/pusterad-gelar-sosialisasi-lomba-binter-wujudkan-kesamaan-persepsi-dan-tingkatkan-kualitas-pembinaan-teritorial",
      "published": "2026-08-21",
      "accessed": "2026-09-15"
    },
    "addr-puspomad": {
      "title": "Puspomad — situs resmi",
      "url": "https://puspomad.mil.id/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-aau": {
      "title": "Akademi Angkatan Udara — Kontak",
      "url": "https://aau.ac.id/contact-us/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-pushidrosal": {
      "title": "Pushidrosal — situs resmi",
      "url": "https://www.pushidrosal.id/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-kolinlamil": {
      "title": "Kolinlamil — situs resmi",
      "url": "https://kolinlamil.tnial.mil.id/home",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-koarmada3": {
      "title": "Koarmada III — situs resmi",
      "url": "https://koarmada3.tnial.mil.id/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-puspenerbal": {
      "title": "Puspenerbal — Kontak",
      "url": "https://puspenerbal.tnial.mil.id/Kontak-Person/Baca/Kontak-Us-%28Puspenerbal%29.html",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-kormar": {
      "title": "Korps Marinir — Struktur Organisasi",
      "url": "https://marinir.tnial.mil.id/struktur",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-pasmar1": {
      "title": "Pasmar 1 — situs resmi",
      "url": "https://pasmar1.tnial.mil.id/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-pasmar2": {
      "title": "Pasmar 2 — Call Center",
      "url": "https://pasmar2.tnial.mil.id/callcenters",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-pasmar3": {
      "title": "Pasmar 3 — situs resmi",
      "url": "https://pasmar3.tnial.mil.id/",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-akmil": {
      "title": "Akademi Militer — Lokasi",
      "url": "https://www.akmil.ac.id/lokasi",
      "published": null,
      "accessed": "2026-09-15"
    },
    "addr-seskoal": {
      "title": "TNI AL — kegiatan Seskoal di Cipulir",
      "url": "https://www.tnial.mil.id/berita/91142/KASAL-PIMPIN-UPACARA-PENUTUPAN-PENDIDIKAN-DIKREG-SESKOAL-ANGKATAN-KE-65-TA-2026/",
      "published": "2026-06-19",
      "accessed": "2026-09-15"
    },
    "personnel-data-priority-kemhan": {
      "title": "Data Prioritas Jangka Menengah 2025–2029 — Jumlah TNI berdasarkan pangkat",
      "url": "https://perencanaan.data.go.id/renduk?page=224&per-page=10",
      "published": null,
      "accessed": "2026-09-15",
      "note": "Mencatat variabel statistik tahunan Kemhan mengenai jumlah TNI berdasarkan pangkat dan cakupan AD, AL, AU; halaman publik yang diverifikasi belum menampilkan total aktif 2026 per matra."
    },
    "personnel-planning-kemhan-2027": {
      "title": "Ditjen Kuathan Kemhan — Rencana kebutuhan prajurit TNI TA 2027",
      "url": "https://www.kemhan.go.id/kuathan/2026/04/06/rapat-tentang-penyusunan-keputusan-menteri-pertahanan-tentang-alokasi-rencana-kebutuhan-prajurit-tentara-nasional-indonesia-ta-2027.html",
      "published": "2026-04-06",
      "accessed": "2026-09-15",
      "note": "Publikasi resmi menegaskan pengelolaan/alokasi kebutuhan prajurit per matra, tetapi tidak memberikan total kekuatan aktif 2026 per matra."
    }
  },
  "forces": [
    {
      "id": "ad",
      "label": "TNI AD",
      "name": "TNI Angkatan Darat",
      "root": "kasad",
      "nav": [
        [
          "mabesad",
          "Mabesad"
        ],
        [
          "kotama",
          "Kotama / Satuan utama"
        ],
        [
          "pusat",
          "Pusat kecabangan"
        ],
        [
          "pendidikan",
          "Lembaga pendidikan"
        ],
        [
          "wilayah",
          "Komando kewilayahan"
        ]
      ]
    },
    {
      "id": "au",
      "label": "TNI AU",
      "name": "TNI Angkatan Udara",
      "root": "kasau",
      "nav": [
        [
          "mabesau",
          "Mabesau"
        ],
        [
          "au-komando",
          "Komando / Satuan utama"
        ],
        [
          "au-pendidikan",
          "Pendidikan & latihan"
        ],
        [
          "au-pusat",
          "Pusat / Badan pelaksana"
        ]
      ]
    },
    {
      "id": "al",
      "label": "TNI AL",
      "name": "TNI Angkatan Laut",
      "root": "kasal",
      "nav": [
        [
          "mabesal",
          "Mabesal"
        ],
        [
          "al-komando",
          "Komando / Satuan utama"
        ],
        [
          "al-pendidikan",
          "Pendidikan & latihan"
        ],
        [
          "al-pusat",
          "Pusat / Badan pelaksana"
        ]
      ]
    }
  ],
  "personnelPublication": {
    "referenceYear": 2026,
    "unit": "active personnel",
    "policy": "Only official, publicly accessible and verifiable totals by service are displayed. No estimates are used.",
    "lastReviewed": "2026-09-15",
    "sources": [
      "personnel-data-priority-kemhan",
      "personnel-planning-kemhan-2027"
    ],
    "forces": {
      "ad": {
        "publishedTotal": null,
        "status": "awaiting_official_open_total"
      },
      "al": {
        "publishedTotal": null,
        "status": "awaiting_official_open_total"
      },
      "au": {
        "publishedTotal": null,
        "status": "awaiting_official_open_total"
      }
    }
  }
};
