<template>
	<q-card style="width: 700px; max-width: 80vw">
		<q-form method="post" @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">Tambah Stok</div>
				<div class="text-subtitle2">{{ props.productName }}</div>
			</q-card-section>
			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<q-select
					outlined
					v-model="store_id"
					:options="listStores"
					option-value="id"
					option-label="name"
					label="Toko"
					emit-value
					map-options
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-input
					outlined
					v-model="stock"
					label="Stok"
					type="number"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
			</q-card-section>
			<q-card-actions align="right" class="bg-green-7">
				<q-btn color="green-10" label="Simpan" type="submit" />
				<q-btn color="secondary" label="Gagal" v-close-popup />
			</q-card-actions>
		</q-form>
	</q-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { notifySuccess } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import Store from "src/models/Store";
import Stock from "src/models/Stock";

const props = defineProps({
	productId: { type: Number, default: 0 },
	productName: { type: String, default: "" },
});
const store_id = ref();
const stock = ref();
const listStores = reactive([]);

async function fetchStores() {
	const response = await Store.getAll();
	if (response) {
		Object.assign(listStores, response.data.stores);
	}
}

onMounted(() => fetchStores());

const onSubmit = async () => {
	const data = {
		product_id: props.productId,
		store_id: store_id.value,
		stock: stock.value,
	};
	const response = await Stock.create({ data });
	if (response) {
		notifySuccess(response.message);
	}
	forceRerender();
};
</script>
