<template lang="">
	<banner-title class="q-ma-sm">
		<template #title>
			<h2
				class="no-margin text-green-11 text-h6 text-weight-light text-center"
			>
				Stok Produk Saat Ini
			</h2>
		</template>
	</banner-title>
	<q-card class="q-ma-sm">
		<q-card-section class="q-pa-sm">
			<q-table
				:rows="pivot"
				separator="cell"
				:filter="filter"
				@row-click="
					(event, row, index) =>
						$router.push(`/products/${row.product_id}`)
				"
				:columns="columns"
				:loading="loading"
			>
				<template v-slot:top>
					<q-input
						debounce="500"
						v-model="filter"
						placeholder="Cari"
						outlined
						dense
						class="full-width q-pa-none"
					>
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
import { onMounted, ref } from "vue";
import BannerTitle from "src/components/BannerTitle.vue";
import digitSeparator from "src/utils/digit-separator";
import Stock from "src/models/Stock";

const pivot = ref([]);
const filter = ref("");
const loading = ref(false);

onMounted(async () => {
	await fetchPivot();
});

async function fetchPivot() {
	try {
		loading.value = true;
		const response = await Stock.getPivot();
		if (!response) return;
		pivot.value = response.data.pivot;
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;
	}
}

const columns = [
	{
		field: "product_name",
		label: "Produk",
		align: "left",
		name: "product",
		sortable: true,
	},
	{
		field: "product_brand",
		label: "Merek",
		align: "left",
		name: "brand",
		sortable: true,
	},
	{ field: "store_all", label: "Total" },
	{ field: "store_1", label: "Toko 1" },
	{ field: "store_2", label: "Toko 2" },
	{
		field: "product_base_price",
		label: "Harga Dasar",
		format: (val, row) => `${digitSeparator(val)}`,
	},
	{
		field: "product_selling_price",
		label: "Harga Jual",
		format: (val, row) => `${digitSeparator(val)}`,
	},
];
</script>
<style lang=""></style>
