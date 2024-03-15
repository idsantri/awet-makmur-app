<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-form method="post" @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">Edit Order Detail</div>
			</q-card-section>
			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<q-input
					outlined
					v-model="orderDetail.product_name"
					label="Nama Produk"
					disable
				/>
				<q-input
					outlined
					v-model="orderDetail.quantity"
					label="Jumlah/Qty"
					type="number"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => val > 0 || 'Minimal 1',
					]"
				/>
				<currency-input
					outlined
					v-model="orderDetail.cost"
					label="Biaya"
				/>
				<currency-input
					outlined
					v-model="orderDetail.discount"
					label="Diskon"
				/>
			</q-card-section>
			<q-card-actions class="bg-green-7" align="right">
				<q-btn
					color="green-10"
					label="Simpan"
					type="submit"
					no-caps=""
				/>
				<q-btn
					color="secondary"
					label="Gagal"
					v-close-popup
					no-caps=""
				/>
			</q-card-actions>
		</q-form>
	</q-card>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { notifySuccess, notifyError } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { apiTokened } from "../../config/api";
import toArray from "../../utils/to-array";
import CurrencyInput from "src/components/CurrencyInput.vue";

const props = defineProps({
	orderDetail: { type: Object, default: null },
});

const orderDetail = reactive({});

onMounted(() => {
	Object.assign(orderDetail, props.orderDetail);
});

const onSubmit = async () => {
	const data = {
		cost: orderDetail.cost,
		discount: orderDetail.discount,
		quantity: orderDetail.quantity,
	};
	try {
		const response = await apiTokened.put(
			`orders-detail/${orderDetail.id}`,
			data
		);
		notifySuccess(response.data.message);
		forceRerender();
	} catch (error) {
		toArray(error.response.data.message).forEach((message) => {
			notifyError(message);
		});
	}
};
</script>
