<template>
  <q-card class="q-ma-md text-teal-10">
    <q-tabs v-model="tab" class="text-grey" active-color="teal-10" indicator-color="teal" align="justify" narrow-indicator
      outside-arrows mobile-arrows>
      <q-tab name="categories" label="Kategori" />
      <q-tab name="stores" label="Toko" />
      <q-tab name="payments" label="Pembayaran" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="">
      <q-tab-panel name="categories">
        <tab-categories />
      </q-tab-panel>

      <q-tab-panel name="stores">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="payments">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import TabCategories from './categories/CategoriesTab.vue';

const tab = ref('categories')
</script>
