<template>
	<div class="q-ma-sm">
		<q-banner class="no-padding">
			<q-select
				class="col-5 q-pa-sm"
				outlined
				v-model="reportModel"
				:options="reportOptions"
				label="Pilih Jenis Laporan"
				clearable=""
				emit-value
				map-options
			/>
			<div class="row flex-center">
				<q-select
					class="col-6 q-pa-sm"
					outlined
					v-model="yearModel"
					:options="yearOptions"
					label="Pilih Tahun"
					clearable=""
				/>
				<q-select
					class="col-6 q-pa-sm"
					outlined
					v-model="monthModel"
					:options="monthOptions"
					label="Pilih Bulan"
					clearable=""
					emit-value
					map-options
				/>
			</div>
			<div class="q-pa-sm">
				<q-btn
					label="Proses"
					color="green-10"
					class="text-green-11 full-width"
					@click="goToReport"
				/>
			</div>
		</q-banner>
		<suspense>
			<template #default>
				<router-view />
			</template>
			<template #fallback>
				<div class="spinner">
					<q-spinner-cube color="green-6" size="8em" />
				</div>
			</template>
		</suspense>
	</div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { notifyError } from "src/utils/notify";
import { reportOptions, monthOptions, selectedReport } from "./report-utils";
import fetchApi from "src/api/fetchApi";

const router = useRouter();
const reportModel = ref(useRoute().name);
const yearModel = ref(useRoute().params.year);
const monthModel = ref(useRoute().params.month);
const yearOptions = ref([]);

onMounted(async () => {
	const { lists_year } = await fetchApi("orders/lists-year");
	yearOptions.value = lists_year;
});

const goToReport = () => {
	const report = selectedReport(reportModel.value);
	if (!report) return notifyError("Tentukan jenis laporan yang diinginkan!");

	const year = yearModel.value;
	const month = monthModel.value;

	let url = "";
	if (report.withYear) {
		if (!year) {
			return notifyError("Tentukan tahun laporan!");
		}

		if (month) {
			url = `/reports/${report.value}/${year}/${month}`;
		} else {
			url = `/reports/${report.value}/${year}`;
		}
	} else {
		url = `/reports/${report.value}`;
	}
	// return console.log(url);
	router.push(url);
};
</script>
