<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form method="post" @submit.prevent="onSubmit">
      <q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
        <div class="text-subtitle1">Edit Transaksi</div>
      </q-card-section>

      <q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
        <q-select outlined v-model="copyOrder.store_id" :options="listStores" option-value="id" option-label="name"
          emit-value map-options label="Toko" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
        <div class="text-subtitle1 q-mt-md">Data Pelanggan</div>
        <q-input outlined v-model="copyOrder.customer_name" label="Nama" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" />
        <q-input outlined v-model="copyOrder.customer_address" label="Alamat" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" />
        <q-input outlined v-model="copyOrder.customer_phone" label="Telepon" type="number"
          :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
        <q-select outlined v-model="copyOrder.payment" :options="listPayment" option-value="val" option-label="val"
          emit-value map-options label="Pembayaran" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
        <q-input v-model="copyOrder.note" outlined type="textarea" label="Catatan" autogrow
          placeholder="Catatan transaksi" />
      </q-card-section>
      <q-card-actions class="bg-green-7" align="right">
        <q-btn color="green-10" label="Simpan" type="submit" />
        <q-btn color="secondary" label="Gagal" v-close-popup />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script setup>
import { ref, toRefs, reactive } from "vue";
import { notifySuccess, notifyError } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { apiTokened } from "../../config/api";
import toArray from "../../utils/to-array";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter()
const props = defineProps({
  order: { type: Object, default: null },
});

const listStores = reactive([]);
const listPayment = reactive([]);
try {
  const responsePayment = await apiTokened.get(`lists/payment-method`);
  Object.assign(listPayment, responsePayment.data.data.lists);
  const responseStore = await apiTokened.get(`stores`);
  Object.assign(listStores, responseStore.data.data.stores);
} catch (error) {
  console.log("Not Found: list ", error.response);
}

const copyOrder = reactive({});
Object.assign(copyOrder, props.order);
const onSubmit = async () => {
  const { id, store_id, customer_name, customer_address, customer_phone, payment, note } = copyOrder;
  const data = { store_id, customer_name, customer_address, customer_phone, payment, note }
  //return  console.log(data);
  try {
    const response = await apiTokened.put(`orders/${id}`, data);
    notifySuccess(response.data.message);
    forceRerender();
  } catch (error) {
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  }
};

</script>
