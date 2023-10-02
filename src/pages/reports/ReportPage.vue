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
			<q-table :rows="dataTable" row-key="name" :columns="dataColumn" />
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

const data = ref([]);
const dataTable = ref([]);
const dataColumn = ref([]);
const dataChart = ref({});

const fetchData = async () => {
	try {
		const response = await apiTokened.get(
			`reports/${reportName}/${year}${month ? "/" + month : ""}`
		);
		const result = response.data.data;
		return result;
	} catch (error) {
		toArray(error.response.data.message).forEach((message) => {
			notifyError(message);
		});
	}
};
onMounted(async () => {
	const dataFetch = await fetchData();

	if (reportName == "transactions") {
		data.value = dataFetch.transactions;
		dataTable.value = utils.sumRows(data.value, "store_name");
		const head = {
			field: "store_name",
			label: "Toko",
			align: "left",
		};
		if (month) {
			dataChart.value = utils.chartMonth(data.value, "store_name");
			dataColumn.value = utils.columnMonth(head);
		} else {
			dataChart.value = utils.chartYear(data.value, "store_name");
			dataColumn.value = utils.columnYear(head);
		}
	}

	if (reportName == "products-out") {
		data.value = dataFetch.products_out;
		dataTable.value = utils.sumRows(data.value, "product_name");
		const head = {
			field: "product_name",
			label: "Produk",
			align: "left",
		};
		if (month) {
			dataChart.value = utils.chartMonth(data.value, "product_name");
			dataColumn.value = utils.columnMonth(head);
		} else {
			dataChart.value = utils.chartYear(data.value, "product_name");
			dataColumn.value = utils.columnYear(head);
		}
	}

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
