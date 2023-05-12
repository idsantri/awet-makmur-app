<template>
  <q-card class="q-ma-md text-green-10">
    <q-tabs v-model="tab" class="text-grey" active-color="green-10" indicator-color="green" align="justify"
      narrow-indicator outside-arrows mobile-arrows>
      <q-tab name="payments" label="Pembayaran" />
      <q-tab name="categories" label="Kategori" />
      <q-tab name="stores" label="Toko" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated class="" swipeable>
      <q-tab-panel name="categories">
        <tab-categories />
      </q-tab-panel>

      <q-tab-panel name="stores">
        <tab-stores />
      </q-tab-panel>

      <q-tab-panel name="payments">
        <tab-payments />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import TabCategories from './categories/CategoriesTab.vue';
import TabStores from './stores/StoresTab.vue';
import TabPayments from './payments/PaymentsTab.vue';

const tab = ref('payments')
</script>
