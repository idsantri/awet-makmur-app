<template>
  <q-card class="q-ma-sm text-green-10 bg-green-7">
    <q-tabs v-model="tab" class="text-green-10" active-color="green-11" indicator-color="green-10" align="justify"
      narrow-indicator outside-arrows mobile-arrows>
      <q-tab name="payments" label="Pembayaran" />
      <q-tab name="categories" label="Kategori" />
      <q-tab name="stores" label="Toko" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated swipeable>
      <q-tab-panel name="payments" class="no-padding">
        <tab-payments />
      </q-tab-panel>

      <q-tab-panel name="categories" class="no-padding">
        <tab-categories />
      </q-tab-panel>

      <q-tab-panel name="stores" class="no-padding">
        <tab-stores />
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
