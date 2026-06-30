<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-form method="post" @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">Edit Transaksi</div>
			</q-card-section>

			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<q-select
					outlined
					v-model="copyOrder.store_id"
					:options="listStores"
					option-value="id"
					option-label="name"
					emit-value
					map-options
					label="Toko"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<div class="text-subtitle1 q-mt-md">Data Pelanggan</div>
				<q-input
					outlined
					v-model="copyOrder.customer_name"
					label="Nama"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-input
					outlined
					v-model="copyOrder.customer_address"
					label="Alamat"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-input
					outlined
					v-model="copyOrder.customer_phone"
					label="Telepon"
					type="number"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-select
					outlined
					v-model="copyOrder.payment"
					:options="listPayment"
					option-value="val"
					option-label="val"
					emit-value
					map-options
					label="Pembayaran"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-input
					v-model="copyOrder.note"
					outlined
					type="textarea"
					label="Catatan"
					autogrow
					placeholder="Catatan transaksi"
				/>
			</q-card-section>
			<q-card-actions class="bg-green-7" align="right">
				<q-btn color="green-10" label="Simpan" type="submit" />
				<q-btn color="secondary" label="Gagal" v-close-popup />
			</q-card-actions>
		</q-form>
	</q-card>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { notifySuccess } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { useRouter } from "vue-router";
import List from "src/models/List";
import Store from "src/models/Store";
import Order from "src/models/Order";

const router = useRouter();
const props = defineProps({
	order: { type: Object, default: null },
});

const listStores = reactive([]);
const listPayment = reactive([]);

const copyOrder = reactive({});
Object.assign(copyOrder, props.order);

async function fetchStores() {
	const response = await Store.getAll();
	if (response) {
		Object.assign(listStores, response.data.stores);
	}
}

async function fetchPayments() {
	const response = await List.getAll({ var: "payment-method" });
	if (response) {
		Object.assign(listPayment, response.data["payment-method"]);
	}
}
onMounted(async () => {
	await fetchStores();
	await fetchPayments();
});
const onSubmit = async () => {
	const {
		id,
		store_id,
		customer_name,
		customer_address,
		customer_phone,
		payment,
		note,
	} = copyOrder;
	const data = {
		store_id,
		customer_name,
		customer_address,
		customer_phone,
		payment,
		note,
	};
	const response = await Order.update({ id, data });
	if (response) notifySuccess(response.message);
	forceRerender();
};
</script>
