<template>
	<q-card flat>
		<q-card-section class="no-padding">
			<q-list separator="" class="bg-green-1">
				<q-item v-for="(category, index) in categories" :key="index">
					<q-item-section top avatar>
						<q-avatar
							color="green"
							text-color="green-12"
							:icon="category.icon"
						/>
					</q-item-section>

					<q-item-section>
						<q-item-label
							>{{ category.sort }} &ndash;
							{{ category.name }}</q-item-label
						>
						<q-item-label caption lines="2">{{
							category.description
						}}</q-item-label>
					</q-item-section>
					<q-item-section side>
						<q-btn
							icon="edit"
							round
							color="green-8"
							text-color="green-1"
							@click="crud(false, category)"
						></q-btn>
					</q-item-section>
				</q-item>
			</q-list>
		</q-card-section>
		<q-card-actions class="bg-green-6">
			<q-btn
				icon="add"
				label="Tambah"
				no-caps=""
				color="green-10"
				text-color="green-11"
				@click="crud(true, {})"
			/>
		</q-card-actions>
	</q-card>

	<q-dialog v-model="showModal">
		<CategoriesCrud :is-new="newCategory" :category="category" />
	</q-dialog>

	<!-- <pre>{{ categories }}</pre> -->
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import CategoriesCrud from "./CategoriesCrud.vue";
import Category from "src/models/Category.js";

const showModal = ref(false);
const newCategory = ref(false);

let category = {};
const crud = (isNew, cat = {}) => {
	newCategory.value = isNew;
	category = cat;
	showModal.value = true;
};

const categories = reactive([]);
async function fetchData() {
	const response = await Category.getAll();
	if (response) {
		Object.assign(categories, response.data.categories);
	}
}
onMounted(() => fetchData());
</script>
