<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-form method="post" @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">{{ title }}</div>
			</q-card-section>

			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<!-- <q-input outlined v-model="id" label="ID" readonly dense /> -->
				<!-- <q-input outlined v-model="code" label="Kode" /> -->
				<q-input
					outlined
					v-model="name"
					label="Nama"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-input outlined v-model="brand" label="Merek" />
				<!-- <q-input outlined v-model="supplier" label="Pemasok/Supplier" /> -->
				<currency-input
					outlined
					v-model="base_price"
					label="Harga Dasar"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<currency-input
					outlined
					v-model="selling_price"
					label="Harga Jual"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
				<q-select
					outlined
					v-model="category_id"
					:options="listCategories"
					option-value="id"
					option-label="name"
					label="Kategori"
					emit-value
					map-options
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
				/>
			</q-card-section>
			<q-card-actions class="bg-green-7">
				<q-btn
					v-if="id"
					color="negative"
					label="Hapus"
					@click="deleteProduct(id)"
				/>
				<q-space />
				<q-btn color="green-10" label="Simpan" type="submit" />
				<q-btn color="secondary" label="Gagal" v-close-popup />
			</q-card-actions>
		</q-form>
	</q-card>
</template>
<script setup>
import { ref, toRefs, reactive, onMounted } from "vue";
import { notifySuccess } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { useRouter } from "vue-router";
import CurrencyInput from "src/components/CurrencyInput.vue";
import Category from "src/models/Category";
import Product from "src/models/Product";

const router = useRouter();
const props = defineProps({
	isNew: { type: Boolean, default: false },
	product: { type: Object, default: null },
});
const copyProduct = reactive({
	id: null,
	code: "",
	name: "",
	brand: "",
	supplier: "",
	base_price: null,
	selling_price: null,
	category_id: null,
});
Object.assign(copyProduct, props.product);
const {
	id,
	code,
	name,
	brand,
	supplier,
	base_price,
	selling_price,
	category_id,
} = toRefs(copyProduct);

const title = ref("Produk");
if (props.isNew) {
	title.value = "Tambah Produk";
} else {
	title.value = "Edit Produk";
}

const listCategories = reactive([]);
async function fetchCategories() {
	const response = await Category.getAll();
	if (response) {
		Object.assign(listCategories, response.data.categories);
	}
}
onMounted(async () => {
	await fetchCategories();
});

const onSubmit = async () => {
	const data = {
		code: code.value.trim(),
		name: name.value.trim(),
		brand: brand.value.trim(),
		supplier: supplier.value.trim(),
		base_price: base_price.value,
		selling_price: selling_price.value,
		category_id: category_id.value,
	};
	if (props.isNew) {
		const response = await Product.create({ data });
		if (!response) return;
		const id = response.data.product.id;
		notifySuccess(response.message);
		router.push(`/products/${id}`);
	}

	if (!props.isNew) {
		const response = await Product.update({ id: id.value, data });
		if (!response) return;
		notifySuccess(response.message);
		forceRerender();
	}
};

const deleteProduct = async (id) => {
	const response = await Product.remove({ id });
	if (!response) return;
	notifySuccess(response.message);
	router.go(-1);
};
</script>
