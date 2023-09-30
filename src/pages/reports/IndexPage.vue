<template>
	<div class="q-ma-sm">
		<BannerTitle>
			<template #title>
				<h2 class="no-margin text-green-11 text-h6 text-weight-light">
					Laporan Transaksi (2023)
				</h2>
			</template>
		</BannerTitle>

		<q-card class="q-my-sm bg-green-11">
			<q-card-section class="q-pa-sm">
				<canvas id="my-chart" class="q-card q-pa-sm" />
			</q-card-section>
			<q-card-section class="q-pa-sm">
				<q-table
					:rows="transactionsTable"
					row-key="name"
					hide-pagination=""
				/>
			</q-card-section>
		</q-card>
	</div>
	<!-- <pre>{{ transactions }}</pre> -->
</template>
<script setup>
import Chart from "chart.js/auto";
import BannerTitle from "src/components/BannerTitle.vue";
import { apiTokened } from "src/config/api";
import toArray from "src/utils/to-array";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const year = route.params.year;
const month = route.params.month;

const transactions = reactive([]);
try {
	const response = await apiTokened.get(
		`reports/transactions/${year}${month ? "/" + month : ""}`
	);
	Object.assign(transactions, response.data.data.transactions);
} catch (error) {
	console.log(error);
}

const transactionsChart = {
	labels: [
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
	],
	datasets: transactions.map((item, index) => ({
		label: item.store_name,
		data: Object.keys(item)
			.filter((key) => key.startsWith("m"))
			.map((key) => item[key]),
		backgroundColor:
			index === 0 ? "rgba(255, 99, 132, 0.5)" : "rgba(54, 162, 235, 0.5)",
		tension: 0.1,
	})),
};

onMounted(() => {
	new Chart(document.getElementById("my-chart"), {
		type: "bar",
		data: transactionsChart,
		options: {
			scales: { y: { beginAtZero: true } },
			responsive: true,
			// indexAxis: "y",
		},
	});
});

function renameKeys(data) {
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

	return data.map((item) => {
		const newItem = {};
		for (const key in item) {
			const monthIndex = parseInt(key.slice(1)) - 1;
			if (key.startsWith("m")) {
				newItem[months[monthIndex]] = item[key];
			} else if (key == "store_name") {
				newItem["Toko"] = item[key];
			} else if (key == "sub_total") {
				newItem["Sub Total"] = item[key];
			}
		}
		return newItem;
	});
}

function sumRows(data) {
	const totalRow = {
		Toko: "Total",
		Jan: 0,
		Feb: 0,
		Mar: 0,
		Apr: 0,
		Mei: 0,
		Jun: 0,
		Jul: 0,
		Agu: 0,
		Sep: 0,
		Okt: 0,
		Nov: 0,
		Des: 0,
		"Sub Total": 0,
	};

	data.forEach((row) => {
		for (const key in row) {
			if (!isNaN(row[key])) {
				totalRow[key] = (
					parseInt(totalRow[key]) + parseInt(row[key])
				).toString();
			}
		}
	});

	return [...data, totalRow];
}

const transactionsTable = ref([]);
transactionsTable.value = renameKeys(transactions);
transactionsTable.value = sumRows(transactionsTable.value);
</script>
