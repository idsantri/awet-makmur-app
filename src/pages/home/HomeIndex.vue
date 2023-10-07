<template>
	<div style="margin-top: 50px">
		<div class="text-subtitle1 text-center">Selamat Datang</div>
		<div class="text-subtitle2 text-center">di Toko Awet Makmur</div>
	</div>
	<div class="text-center" style="margin-top: 20px">
		<q-avatar size="150px" square="">
			<q-img src="../../assets/icon-c.png" />
		</q-avatar>
	</div>

	<q-card class="q-pa-sm q-ma-sm q-mt-lg bg-green-11">
		<q-card-section class="no-padding">
			<h2 class="text-h6 text-center no-margin">Laporan Transaksi</h2>
			<p class="text-subtitle1 text-center no-margin q-pb-sm">
				Enam Bulan Terakhir
			</p>
		</q-card-section>
		<q-card-section class="no-padding">
			<canvas id="chart-transactions" class="q-card q-pa-sm" />
		</q-card-section>
	</q-card>

	<!-- <pre>{{ get5Months() }}</pre> -->
</template>
<script setup>
import fetchApi from "src/api/fetchApi";
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

const dataFetch = ref([]);
const dataChart = ref([]);

function getMonths6() {
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];
	const d = new Date();
	const thisMonth = d.getMonth();

	return Array.from({ length: 6 }, (_, i) => {
		let monthIndex = thisMonth - i;
		if (monthIndex < 0) monthIndex += 12;
		return months[monthIndex];
	}).reverse();
}

function chart(data) {
	return {
		labels: getMonths6(),
		datasets: data.map((item, index) => ({
			label: item.store_name,
			data: [
				item.month_5,
				item.month_4,
				item.month_3,
				item.month_2,
				item.month_1,
				item.month_0,
			],
			backgroundColor:
				index % 2 == 0
					? "rgba(255, 99, 132, 0.5)"
					: "rgba(54, 162, 235, 0.5)",
			tension: 0.1,
		})),
	};
}

onMounted(async () => {
	const { transactions } = await fetchApi("reports/transactions/by-month");
	dataFetch.value = transactions;
	// console.log("f", dataFetch.value);

	dataChart.value = chart(dataFetch.value);
	// console.log(dataChart.value);
	Chart.register(ChartDataLabels);

	new Chart(document.getElementById("chart-transactions"), {
		type: "line",
		data: dataChart.value,
		options: {
			scales: { y: { beginAtZero: true } },
			responsive: true,
			// indexAxis: "y",
			plugins: {
				datalabels: {
					backgroundColor: function (context) {
						return context.dataset.backgroundColor;
					},
					borderColor: "white",
					borderRadius: 25,
					borderWidth: 1,
					color: "white",
					font: {
						weight: "bold",
					},
					padding: 8,
				},
			},
		},
	});
});
</script>
