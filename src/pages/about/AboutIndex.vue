import { resolveDirective } from 'vue'; import { resolveDirective } from 'vue';
<template>
	<q-card class="q-ma-sm">
		<q-card-section>
			<div class="text-subtitle1">Tentang Aplikasi</div>
			<div class="text-body1">TOKO AWET MAKMUR</div>
		</q-card-section>
		<q-card-section class="q-pt-none">
			<div v-for="(item, index) in releases" :key="index" class="q-mb-sm">
				<q-list bordered separator>
					<q-item-label header class="bg-green-1 q-pa-sm"
						>Versi {{ item.ver }}
						<span class="text-caption"> ({{ item.date }}) </span>
					</q-item-label>

					<q-item v-for="(item, index) in item.release" :key="index">
						<q-item-section>
							<q-item-label>{{ index }}</q-item-label>
							<q-item-label caption>
								<q-list v-for="(it, id) in item" :key="id">
									<q-item-label>{{ "- " + it }}</q-item-label>
								</q-list>
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
const releases = [
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
</script>

<style scoped></style>
