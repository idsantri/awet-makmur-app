<template>
	<q-card class="q-my-sm bg-green-11">
		<q-card-section class="no-padding">
			<BannerTitle>
				<template #title>
					<h2
						class="no-margin text-green-11 text-h6 text-weight-light text-center"
					>
						Laporan {{ title }} ({{
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
				:rows="dataTable"
				row-key="name"
				:columns="dataColumn"
				separator="cell"
			/>
		</q-card-section>
	</q-card>
	<!-- <pre>{{ transactions }}</pre> -->
</template>
<script setup>
import Chart from "chart.js/auto";
import BannerTitle from "src/components/BannerTitle.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as utils from "./report-utils";
import fetchApi from "src/api/fetchApi";

const route = useRoute();
const year = route.params.year;
const month = route.params.month;
const reportName = route.name;

const data = ref([]);
const dataTable = ref([]);
const dataColumn = ref([]);
const dataChart = ref({});
const title = ref("");

async function process() {
	const report = utils.reportOptions.find(
		(word) => word.value === reportName
	);

	const dataFetch = await fetchApi(
		`reports/${reportName}/${year}${month ? "/" + month : ""}`
	);

	title.value = report.label;
	data.value = dataFetch[report.response];
	dataTable.value = utils.sumRows(data.value, report.fieldTotal);
	const head = {
		field: report.fieldTotal,
		label: report.fieldHead,
		align: "left",
	};
	if (month) {
		dataChart.value = utils.chartMonth(data.value, report.fieldTotal);
		dataColumn.value = utils.columnMonth(head);
	} else {
		dataChart.value = utils.chartYear(data.value, report.fieldTotal);
		dataColumn.value = utils.columnYear(head);
	}
}

onMounted(async () => {
	await process();
	// const dataFetch = await fetchApi(
	// 	`reports/${reportName}/${year}${month ? "/" + month : ""}`
	// );

	// if (reportName == "transactions") {
	// 	title.value = "Transaksi";
	// 	data.value = dataFetch.transactions;
	// 	dataTable.value = utils.sumRows(data.value, "store_name");
	// 	const head = {
	// 		field: "store_name",
	// 		label: "Toko",
	// 		align: "left",
	// 	};
	// 	if (month) {
	// 		dataChart.value = utils.chartMonth(data.value, "store_name");
	// 		dataColumn.value = utils.columnMonth(head);
	// 	} else {
	// 		dataChart.value = utils.chartYear(data.value, "store_name");
	// 		dataColumn.value = utils.columnYear(head);
	// 	}
	// }

	new Chart(document.getElementById("my-chart"), {
		type: "bar",
		data: dataChart.value,
		options: {
			scales: { y: { beginAtZero: true } },
			responsive: true,
			// indexAxis: "y",
		},
	});
});
</script>
