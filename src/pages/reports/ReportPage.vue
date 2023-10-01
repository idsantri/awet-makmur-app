<template>
	<q-card class="q-my-sm bg-green-11">
		<q-card-section class="no-padding">
			<BannerTitle>
				<template #title>
					<h2
						class="no-margin text-green-11 text-h6 text-weight-light text-center"
					>
						Laporan Transaksi ({{
							month
								? String(month).padStart(2, "0") + "/" + year
								: year
						}})
					</h2>
				</template>
			</BannerTitle>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<div style="overflow-x: scroll">
				<div style="min-width: 600px">
					<canvas id="my-chart" class="q-card q-pa-sm" />
				</div>
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				:rows="transactionsTable"
				row-key="name"
				hide-pagination=""
				:columns="transactionsColumn"
			/>
		</q-card-section>
	</q-card>
	<!-- <pre>{{ transactions }}</pre> -->
</template>
<script setup>
import Chart from "chart.js/auto";
import BannerTitle from "src/components/BannerTitle.vue";
import { apiTokened } from "src/config/api";
import { notifyError } from "src/utils/notify";
import toArray from "src/utils/to-array";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as utils from "./report-utils";

const route = useRoute();
const year = route.params.year;
const month = route.params.month;
const reportName = route.name;

const transactions = ref([]);
const transactionsTable = ref([]);
const transactionsColumn = ref([]);
const transactionsChart = ref({});

const getTransactions = async () => {
	try {
		const response = await apiTokened.get(
			`reports/${reportName}/${year}${month ? "/" + month : ""}`
		);
		const result = response.data.data.transactions;
		return result;
	} catch (error) {
		toArray(error.response.data.message).forEach((message) => {
			notifyError(message);
		});
	}
};

onMounted(async () => {
	transactions.value = await getTransactions();
	transactionsTable.value = utils.sumRows(transactions.value, "sub_total");

	if (month) {
		transactionsChart.value = utils.chartMonth(transactions.value);
		transactionsColumn.value = utils.columnMonth;
	} else {
		transactionsChart.value = utils.chartYear(transactions.value);
		transactionsColumn.value = utils.columnYear;
	}

	new Chart(document.getElementById("my-chart"), {
		type: "bar",
		data: transactionsChart.value,
		options: {
			scales: { y: { beginAtZero: true } },
			responsive: true,
			// indexAxis: "y",
		},
	});
});
</script>
