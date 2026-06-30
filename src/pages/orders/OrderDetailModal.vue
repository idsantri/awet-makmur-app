<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-form method="post" @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">Edit Order Detail</div>
			</q-card-section>
			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<q-input
					outlined
					v-model="order_detail.product_name"
					label="Nama Produk"
					disable
				/>
				<q-input
					outlined
					v-model="order_detail.quantity"
					label="Jumlah/Qty"
					type="number"
					:rules="[
						(val) => !!val || 'Harus diisi!',
						(val) => val > 0 || 'Minimal 1',
					]"
				/>
				<currency-input
					outlined
					v-model="order_detail.cost"
					label="Biaya"
				/>
				<currency-input
					outlined
					v-model="order_detail.discount"
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
import { notifySuccess } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import CurrencyInput from "src/components/CurrencyInput.vue";
import OrderDetail from "src/models/OrderDetail";

const props = defineProps({
	orderDetail: { type: Object, default: null },
});

const order_detail = reactive({});

onMounted(() => {
	Object.assign(order_detail, props.orderDetail);
	// console.log("🚀 ~ order_detail:", order_detail);
});

const onSubmit = async () => {
	const data = {
		cost: order_detail.cost,
		discount: order_detail.discount,
		quantity: order_detail.quantity,
	};

	const response = await OrderDetail.update({
		orderId: order_detail.order_id,
		id: order_detail.id,
		data,
	});
	notifySuccess(response.message);
	forceRerender();
};
</script>
