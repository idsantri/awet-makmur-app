<template>
	<div class="q-ma-sm">
		<BannerTitle>
			<template #title>
				<div class="text-h6 text-weight-light">Data Stok</div>
				<div class="text-subtitle1">{{ storeName }}</div>
			</template>
		</BannerTitle>
		<div class="q-mt-sm">
			<div v-if="stocks.length > 0">
				<q-table
					:rows="stocks"
					row-key="id"
					:columns="columns"
					:filter="filter"
					@row-click="
						(event, row) => $router.push(`/products/${row.id}`)
					"
					class="text-green-10"
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
				<q-card class="q-mt-sm bg-green-7">
					<q-card-section
						class="text-body1 text-green-11 text-center text-italic q-pb-none"
					>
						<p class="no-margin">
							Total Stok: {{ digitSeparator(totalItems) }} item,
							<br />
							dengan nilai:
							<span class="text-bold"
								>Rp{{ digitSeparator(totalPrice) }}</span
							>
						</p>
					</q-card-section>
					<q-card-section>
						<q-btn
							color="green-10"
							class="text-green-11 full-width"
							label="Hitung Zakat"
							icon="card_giftcard"
							@click="showModalZakat = true"
						/>
					</q-card-section>
				</q-card>
			</div>
			<div v-else>
				<q-banner class="bg-red-2 text-red-10 q-ma-md">
					<div class="text-body1 text-center">
						Tidak ada data untuk ditampilkan!
					</div>
				</q-banner>
			</div>
		</div>
	</div>
	<q-dialog v-model="showModalZakat">
		<ModalZakat
			:asset="totalPrice"
			@close-modal="() => (showModalZakat = false)"
		>
			<template v-slot:store> Toko {{ storeName }} </template>
		</ModalZakat>
	</q-dialog>

	<!-- <pre>{{ stocks }}</pre> -->
</template>
<script setup>
import digitSeparator from "src/utils/digit-separator";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import ModalZakat from "./ModalZakat.vue";
import BannerTitle from "src/components/BannerTitle.vue";
import Stock from "src/models/Stock";

const stocks = reactive([]);
const { params } = useRoute();
const filter = ref("");
const storeName = ref("");
const showModalZakat = ref(false);

async function fetchStocks() {
	const response = await Stock.getAll({
		store_id: params.id,
	});
	if (response) {
		Object.assign(stocks, response.data.stocks);
		if (stocks?.length > 0) storeName.value = stocks[0].store_name;
	}
}

onMounted(async () => {
	await fetchStocks();
});

const agetTotal = () => {
	stocks.reduce(
		(acc, stock) =>
			acc + Number(stock.product_base_price) * Number(stock.stock),
		0
	);
};
const totalPrice = computed(() => {
	if (!stocks?.length) return 0;
	return stocks.reduce(
		(acc, stock) =>
			acc + Number(stock.product_base_price) * Number(stock.stock),
		0
	);
});

const totalItems = computed(() => {
	if (!stocks?.length) return 0;
	return stocks.reduce((acc, stock) => acc + Number(stock.stock), 0);
});

const columns = [
	{
		name: "product",
		field: (row) =>
			row.product_name +
			(row.product_brand.length > 1
				? " (" + row.product_brand + ")"
				: ""),
		label: "Nama",
		align: "left",
		sortable: true,
	},
	{
		name: "product_base_price",
		field: "product_base_price",
		label: "Harga Dasar",
		align: "right",
		format: (val, row) => `Rp${digitSeparator(val)}`,
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: "stock",
		field: "stock",
		label: "Stok",
		align: "right",
		sortable: true,
		sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
	},
	{
		name: "product_worth",
		field: (row) => Number(row.product_base_price) * Number(row.stock),
		label: "Harga x Stok",
		align: "right",
		format: (val, row) => `Rp${digitSeparator(val)}`,
	},
];
</script>
