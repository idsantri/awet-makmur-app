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
				:rows="dataFetch"
				separator="cell"
				:filter="filter"
				@row-click="(event, row, index) => clickRow(event, row, index)"
				:columns="dataColumn"
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
import fetchApi from "src/api/fetchApi";
import { onMounted, ref } from "vue";
import BannerTitle from "src/components/BannerTitle.vue";
import digitSeparator from "src/utils/digit-separator";
import { useRouter } from "vue-router";

const dataFetch = ref([]);
const filter = ref("");
const dataColumn = ref([]);

onMounted(async () => {
	const { products_stock } = await fetchApi("reports/products-stock");
	dataFetch.value = products_stock;
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
});

const router = useRouter();
function clickRow(e, row, i) {
	// console.log(row);
	router.push(`/products/${row.product_id}`);
}
</script>
<style lang=""></style>
