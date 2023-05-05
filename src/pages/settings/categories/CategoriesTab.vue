<template>
  <q-card flat>
    <q-card-section class="no-padding">
      <q-list>
        <q-item v-for="(category, index) in categories" :key="index">
          <q-item-section top avatar>
            <q-avatar color="teal" text-color="white" :icon="category.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ category.name }}</q-item-label>
            <q-item-label caption lines="2">{{ category.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="edit" round color="teal-2" text-color="teal-10" @click="crudCategories(false, category)"></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="q-py-none ">
      <q-btn icon="add" flat label="Tambah" color="teal-2" text-color="teal-10" @click="crudCategories(true, {})" />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="showModalCategories">
    <CategoriesCrud :is-new="newCategory" :category="category" />
  </q-dialog>

  <!-- <pre>{{ categories }}</pre> -->
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import { reactive, ref } from 'vue';
import CategoriesCrud from './CategoriesCrud.vue';

const showModalCategories = ref(false)
const newCategory = ref(false)
let category = {}
const crudCategories = (isNew, cat = {}) => {
  newCategory.value = isNew
  category = cat
  showModalCategories.value = true
}

const categories = reactive([])
try {
  const response = await apiTokened.get(`categories`);
  Object.assign(categories, response.data.data.categories);
} catch (error) {
  console.log("Not Found: categories -> list", error.response);
}
</script>
