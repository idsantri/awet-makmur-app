<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-form @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">{{ title }}</div>
			</q-card-section>

			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<q-input
					outlined
					v-model="propsCategory.slug"
					label="Slug"
					readonly
					dense
				/>
				<q-input
					outlined
					v-model="propsCategory.name"
					label="Nama"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
					@blur="propsCategory.slug = slugify(propsCategory.name)"
				/>
				<q-input
					outlined
					v-model="propsCategory.sort"
					label="No Urut"
					type="number"
				/>
				<q-input
					outlined
					v-model="propsCategory.description"
					label="Deskripsi"
				/>
				<q-input outlined v-model="propsCategory.icon" label="Ikon" />
				<div>
					<a
						href="https://fonts.google.com/icons"
						target="_blank"
						class="text-body1 text-green-6"
						>Daftar Ikon</a
					>
				</div>
			</q-card-section>
			<q-card-actions align="right" class="bg-green-7">
				<q-btn
					v-if="propsCategory.id"
					color="negative"
					label="Hapus"
					@click="deleteCategory(propsCategory.id)"
				/>
				<q-space />
				<q-btn color="green-10" label="Simpan" type="submit" />
				<q-btn color="secondary" label="Gagal" v-close-popup />
			</q-card-actions>
		</q-form>
		<!-- <pre>{{ propsCategory }}</pre> -->
	</q-card>
</template>
<script setup>
import { ref, reactive } from "vue";
import { notifySuccess } from "src/utils/notify";
import { forceRerender } from "src/utils/buttons-click";
import slugify from "src/utils/slugify.js";
import { useQuasar } from "quasar";
import Category from "src/models/Category";

const props = defineProps({
	isNew: { type: Boolean, default: false },
	category: { type: Object, default: null },
});
const propsCategory = reactive({
	id: null,
	name: "",
	slug: "",
	sort: "",
	icon: "",
	description: null,
});
Object.assign(propsCategory, props.category);

const title = ref("Kategori");
if (props.isNew) {
	title.value = "Tambah Kategori";
} else {
	title.value = "Edit Kategori";
}

const onSubmit = async () => {
	const data = {
		name: propsCategory.name,
		slug: propsCategory.slug,
		sort: propsCategory.sort,
		description: propsCategory.description,
		icon: propsCategory.icon,
	};

	let response = null;
	if (props.isNew) response = await Category.create({ data });
	else response = await Category.update({ id: propsCategory.id, data });
	if (response) {
		notifySuccess(response.message);
	}
	forceRerender();
};

const $q = useQuasar();
const deleteCategory = async (id) => {
	const response = await Category.remove({ id });
	if (response) {
		notifySuccess(response.message);
	}
	forceRerender();
};
</script>
