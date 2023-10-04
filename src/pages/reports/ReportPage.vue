<template>
	<q-card class="q-my-sm bg-green-11">
		<q-card-section class="no-padding">
			<BannerTitle>
				<template #title>
					<h2
						class="no-margin text-green-11 text-h6 text-weight-light text-center"
					>
						Laporan {{ title }}
						<span v-if="year">
							({{
								month
									? String(month).padStart(2, "0") +
									  "/" +
									  year
									: year
							}})
						</span>
					</h2>
				</template>
			</BannerTitle>
		</q-card-section>
		<q-card-section class="q-pa-sm" v-if="report.withChart">
			<div style="overflow-x: scroll">
				<div style="min-width: 600px">
					<canvas id="my-chart" class="q-card q-pa-sm" />
				</div>
			</div>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-table
				:rows="dataTable"
				:columns="dataColumn"
				separator="cell"
				:filter="filter"
				@row-click="(event, row, index) => clickRow(event, row, index)"
			>
				<template v-slot:top>
					<q-input debounce="500" v-model="filter" placeholder="Cari">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</template>
			</q-table>
		</q-card-section>
	</q-card>
</template>
<script setup>
import Chart from "chart.js/auto";
import BannerTitle from "src/components/BannerTitle.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as utils from "./report-utils";
import fetchApi from "src/api/fetchApi";
import digitSeparator from "src/utils/digit-separator";

const route = useRoute();
const year = route.params.year;
const month = route.params.month;
const reportName = route.name;

const filter = ref("");
const data = ref([]);
const dataTable = ref([]);
const dataColumn = ref([]);
const dataChart = ref({});
const title = ref("");
const report = utils.selectedReport(reportName);

function clickRow(e, r, i) {
	// console.log("e", e);
	// console.log("r", r);
	// console.log("i", i);
}

async function process() {
	const dataFetch = await fetchApi(
		`reports/${reportName}/${year ? "/" + year : ""}${
			month ? "/" + month : ""
		}`
	);

	title.value = report.label;
	data.value = dataFetch[report.response];

	if (report.withSum) {
		dataTable.value = utils.sumRows(data.value, report.fieldTotal);
		const head = {
			field: report.fieldTotal,
			label: report.fieldHead,
			align: "left",
			sortable: true,
			name: report.fieldHead,
		};
		// console.log(dataTable.value);
		if (month) {
			dataChart.value = utils.chartMonth(data.value, report.fieldTotal);
			dataColumn.value = utils.columnMonth(head);
		} else {
			dataChart.value = utils.chartYear(data.value, report.fieldTotal);
			dataColumn.value = utils.columnYear(head);
		}
	} else {
		dataTable.value = data.value;
		// console.log(dataTable.value);
		if (report.value == "products-stock") {
			dataColumn.value = [
				{
					field: "name",
					label: "Produk",
					align: "left",
					name: "product",
					sortable: true,
				},
				{
					field: "brand",
					label: "Merek",
					align: "left",
					name: "brand",
					sortable: true,
				},
				{ field: "store_all", label: "Total" },
				{ field: "store_1", label: "Toko 1" },
				{ field: "store_2", label: "Toko 2" },
				{
					field: "base_price",
					label: "Harga Dasar",
					format: (val, row) => `${digitSeparator(val)}`,
				},
				{
					field: "selling_price",
					label: "Harga Jual",
					format: (val, row) => `${digitSeparator(val)}`,
				},
			];
		}
	}
}

onMounted(async () => {
	await process();
	if (report.withChart) {
		new Chart(document.getElementById("my-chart"), {
			type: "bar",
			data: dataChart.value,
			options: {
				scales: { y: { beginAtZero: true } },
				responsive: true,
				// indexAxis: "y",
			},
		});
	}
});
</script>
