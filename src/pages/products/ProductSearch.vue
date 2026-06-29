<template>
	<q-card style="width: 100%">
		<q-card-section class="bg-green-8 text-green-1 q-pa-sm">
			<h2 class="text-subtitle1 no-margin">Cari Produk</h2>
		</q-card-section>
		<q-card-section>
			<q-table
				flat
				:rows="products"
				row-key="id"
				:columns="columns"
				:filter="filter"
				@row-click="(event, row) => $router.push(`/products/${row.id}`)"
				class="text-green-10"
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
		<q-card-actions align="right" class="bg-green-7">
			<q-btn color="secondary" label="Tutup" v-close-popup />
		</q-card-actions>
	</q-card>
</template>

<script setup>
import Product from "src/models/Product";
import { ref, onMounted } from "vue";

const products = ref([]);
const filter = ref("");
const loading = ref(false);

async function fetchProduct() {
	try {
		loading.value = true;
		const response = await Product.getAll({ all: true });
		if (!response) return;

		products.value = response.data.products;
	} finally {
		loading.value = false;
	}
}

onMounted(async () => {
	await fetchProduct();
});

const columns = [
	{
		name: "category_name",
		label: "Kategori",
		field: "category_name",
		align: "left",
		sortable: true,
	},
	{
		name: "brand",
		label: "Merek",
		align: "left",
		field: "brand",
		sortable: true,
	},
	{
		name: "name",
		required: true,
		label: "Nama",
		align: "left",
		field: "name",
		sortable: true,
	},
	{
		name: "stock",
		required: true,
		label: "Stok",
		align: "center",
		field: (row) => row.stocks.reduce((a, b) => a + b.stock, 0),
		sortable: true,
	},
];
</script>
<style lang="scss"></style>
