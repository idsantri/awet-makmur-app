const releases = [
	{
		ver: "1.2.0",
		date: "Juni 2026",
		release: {
			Improvement: [
				"Peningkatan performa aplikasi",
				"Upgrade framework dan library yang digunakan untuk meningkatkan keamanan dan stabilitas aplikasi",
				"Upgrade backend untuk meningkatkan kecepatan respon API",
				"Perbaikan bug minor yang ditemukan pada versi sebelumnya",
				"Optimasi tampilan antarmuka untuk perangkat mobile",
			],
			Hosting: [
				"Perpanjangan hosting untuk 1 tahun ke depan, berakhir tanggal 13 Juni 2027",
			],
		},
	},
	{
		ver: "1.1.3",
		date: "Februari 2025",
		release: {
			"Save Scroll": ["Menyimpan posisi halaman produk ketika di scroll"],
		},
	},
	{
		ver: "1.1.2",
		date: "Maret 2024",
		release: {
			"Order Detail (Transaksi)": [
				"Tambah fitur edit order detail (pada transaksi)",
			],
			Lainnya: ["Tampilan pemisah ribuan pada input mata uang"],
		},
	},
	{
		ver: "1.1.1",
		date: "Oktober 2023",
		release: {
			"Upgrade Fitur": ["Laporan"],
			"Laporan Berkala (Admin)": [
				"Laporan biaya per tahun",
				"Laporan biaya per bulan",
			],
			"Fixed bug": [
				"Biaya tidak masuk pada laporan laba bersih",
				"Laba bersih: (Harga Jual - Harga Dasar - Diskon)",
			],
			Biaya: ["0"],
		},
	},
	{
		ver: "1.1.0",
		date: "Oktober 2023",
		release: {
			"Upgrade Fitur": ["Laporan", "Nota"],
			"Halaman Awal (Admin)": ["Laporan transaksi enam bulan terakhir"],
			"Laporan Berkala (Admin)": [
				"Laporan transaksi per tahun",
				"Laporan transaksi per bulan",
				"Laporan barang keluar per tahun",
				"Laporan barang keluar per bulan",
				"Laporan laba bersih per tahun",
				"Laporan laba bersih per bulan",
				"Laporan laba kotor per tahun",
				"Laporan laba kotor per bulan",
			],
			"Laporan Stok (Semua User)": ["Laporan Stok Produk Semua Toko"],
			Nota: ["Pelanggan tidak perlu tahu rincian biaya (ongkir)"],
			Biaya: ["Rp500.000"],
			Pembayaran: ["Tanggal 18 Oktober 2023", "Status: Lunas"],
		},
	},
	{
		ver: "1.0.0",
		date: "Juni 2023",
		release: {
			Fitur: [
				"Data produk",
				"Data stok",
				"Data Transaksi",
				"Nota PDF",
				"Kirim nota via WA",
				"Mendukung multi toko",
				"Perhitungan Zakat Mal",
				"Aplikasi berbasis web dengan fitur PWA (bisa diinstall)",
				"Biaya Rp3.000.000",
			],
			Hosting: [
				"3 tahun",
				"Berakhir tanggal 13 Juni 2026",
				"Biaya Rp1.100.000 (termasuk PPN 11%)",
				"Biaya perpanjangan mengikuti kebijakan penyedia hosting",
			],
			Domain: ["https://awetmakmur.netlify.app", "harga Rp0"],
			"Ringkasan Biaya": [
				"Aplikasi: Rp3.000.000",
				"Hosting: Rp1.100.000 (untuk tiga tahun)",
				"Domain: Rp0",
				"Total: Rp4.100.000",
			],
			Pembayaran: [
				"Tahap 1: Rp2.000.000, tanggal 12 Mei 2023",
				"Tahap 2: Rp2.100.000, tanggal 12 Juni 2023",
				"Status: LUNAS",
			],
		},
	},
];

export default releases;
