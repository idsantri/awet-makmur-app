<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
			<div class="text-subtitle1">Deskripsi Produk</div>
		</q-card-section>

		<q-card-section class="q-pa-sm bg-green-1 q-gutter-sm">
			<q-editor v-model="textDescription" min-height="5rem" />
		</q-card-section>

		<q-card-actions align="right" class="bg-green-7">
			<q-btn color="green-10" label="Simpan" @click="saveDescription" />
			<q-btn color="secondary" label="Gagal" v-close-popup />
		</q-card-actions>
	</q-card>
</template>
<script setup>
import { ref } from "vue";
import { forceRerender } from "../../utils/buttons-click";
import Product from "src/models/Product";

const props = defineProps({
	productDescription: { type: String, default: "" },
	productId: { type: Number, default: 0 },
});

const textDescription = ref(props.productDescription);
const id = ref(props.productId);
const saveDescription = async () => {
	await Product.update({
		id: id.value,
		data: { description: textDescription.value },
	});

	forceRerender();
};
</script>
