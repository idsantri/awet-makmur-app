<template>
  <q-card flat>
    <q-card-section class="no-padding">
      <q-list separator="" class="bg-green-1">
        <q-item v-for="(store, index) in stores" :key="index">
          <q-item-section top avatar>
            <q-avatar color="green" text-color="green-12" icon="store" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ store.name }}</q-item-label>
            <q-item-label overline="">{{ store.address }}</q-item-label>
            <q-item-label caption="" lines="2">{{ store.address_full }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="edit" round color="green-8" text-color="green-1" @click="crud(false, store)"></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="bg-green-6">
      <q-btn icon="add" label="Tambah" no-caps="" color="green-10" text-color="green-11" @click="crud(true, {})" />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="showModal">
    <StoresCrud :is-new="newStore" :store="store" />
  </q-dialog>

  <!-- <pre>{{ categories }}</pre> -->
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import { reactive, ref } from 'vue';
import StoresCrud from './StoresCrud.vue';

const showModal = ref(false)
const newStore = ref(false)

let store = {}
const crud = (isNew, st = {}) => {
  newStore.value = isNew
  store = st
  showModal.value = true
}

const stores = reactive([])
try {
  const response = await apiTokened.get(`stores`);
  Object.assign(stores, response.data.data.stores);
} catch (error) {
  console.log("Not Found: Stores -> list", error.response);
}
</script>
