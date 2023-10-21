<template lang="">
	<q-card class="bg-green-11">
		<q-card-section class="no-padding">
			<q-banner class="no-padding">
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
						@click="process"
					/>
				</div>
			</q-banner>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<banner-title>
				<template #title>
					<h2
						class="no-margin text-green-11 text-h6 text-weight-light text-center"
					>
						Laporan Berkala
					</h2>
					<p
						class="text-body1 text-center no-margin"
						v-if="yearModel"
					>
						{{
							!monthModel
								? yearModel
								: yearModel + "/" + monthModel
						}}
					</p>
				</template>
			</banner-title>

			<div v-for="(item, index) in dataFetch" :key="index">
				<q-table
					:rows="item"
					:columns="item.dataColumn"
					separator="cell"
					class="q-my-sm"
					:filter="index == 'products_out' ? filter : null"
				>
					<template v-slot:top>
						<div>
							<h3 class="text-body1 no-margin">
								{{ item.title }}
							</h3>
							<h4 class="text-caption no-margin text-italic">
								{{ item.subTitle }}
							</h4>
						</div>
						<div v-if="index == 'products_out'">
							<q-input
								debounce="500"
								v-model="filter"
								placeholder="Cari"
							>
								<template v-slot:append>
									<q-icon name="search" />
								</template>
							</q-input>
						</div>
					</template>
				</q-table>
			</div>
		</q-card-section>
		<!-- <pre>{{ dataFetch }}</pre> -->
	</q-card>
</template>
<script setup>
import fetchApi from "src/api/fetchApi";
import { onMounted, ref } from "vue";
import BannerTitle from "src/components/BannerTitle.vue";
import * as utils from "src/pages/reports/report-utils";
import { notifyError } from "src/utils/notify";

const dataFetch = ref({});
const yearOptions = ref([]);
const monthOptions = ref(utils.monthOptions());
const yearModel = ref("");
const monthModel = ref("");
const filter = ref("");
function process() {
	let period = "";
	if (!yearModel.value) {
		return notifyError("Tentukan tahun!");
	}
	period = `/${yearModel.value}`;

	if (monthModel.value) {
		period += `/${monthModel.value}`;
	}

	utils.reports().forEach(async (report) => {
		const data = await fetchApi(`reports/${report.url}${period}`);
		// dataFetch.value[report.response] =  data[report.response];
		if (report.response == "products_out") {
			const products = data[report.response].map((item) => {
				const { product_name, product_brand, store_id, ...rest } = item;
				return {
					product: `${product_name} | ${product_brand} | Toko ${store_id}`,
					...rest,
				};
			});
			dataFetch.value[report.response] = utils.sumRows(
				products,
				report.fieldTotal
			);
		} else {
			dataFetch.value[report.response] = utils.sumRows(
				data[report.response],
				report.fieldTotal
			);
		}
		dataFetch.value[report.response].title = report.title;
		dataFetch.value[report.response].subTitle = report.subTitle;

		const head = {
			field: report.fieldTotal,
			label: report.fieldHead,
			align: "left",
			sortable: true,
			name: report.fieldHead,
		};
		// console.log(dataTable.value);
		if (monthModel.value) {
			dataFetch.value[report.response].dataColumn =
				utils.columnMonth(head);
		} else {
			dataFetch.value[report.response].dataColumn =
				utils.columnYear(head);
		}
	});
}

onMounted(async () => {
	const { lists_year } = await fetchApi("orders/lists-year");
	yearOptions.value = lists_year;
});
</script>
<style lang=""></style>
