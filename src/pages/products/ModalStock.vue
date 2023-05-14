<template>
  <q-card style="width: 700px; max-width: 80vw">
    <q-form method="post" @submit.prevent="onSubmit">
      <q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
        <div class="text-subtitle1">Tambah Stok</div>
        <div class="text-subtitle2">{{ props.productName }}</div>
      </q-card-section>
      <q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
        <q-select outlined v-model="store_id" :options="listStores" option-value="id" option-label="name" label="Toko"
          emit-value map-options :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
        <q-input outlined v-model="stock" label="Stok" type="number" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" />
      </q-card-section>
      <q-card-actions align="right" class="bg-green-7">
        <q-btn color="green-10" label="Simpan" type="submit" />
        <q-btn color="secondary" label="Gagal" v-close-popup />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import { notifySuccess, notifyError } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { apiTokened } from "../../config/api";
import toArray from "../../utils/to-array";

const props = defineProps({
  productId: { type: Number, default: 0 },
  productName: { type: String, default: '' }
});
const store_id = ref();
const stock = ref();
const listStores = reactive([]);

try {
  const response = await apiTokened.get(`stores`);
  Object.assign(listStores, response.data.data.stores);
} catch (error) {
  console.log("Not Found: stores -> list", error.response);
}

const onSubmit = async () => {
  if (isNaN(store_id.value)) return notifyError("Tentukan Toko");
  try {
    const response = await apiTokened.post(`stocks`, {
      product_id: props.productId,
      store_id: store_id.value,
      stock: stock.value,
    });
    // console.log(response);
    notifySuccess(response.data.message);
  } catch (error) {
    // console.log(error);
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  } finally {
    forceRerender();
  }
};
</script>
