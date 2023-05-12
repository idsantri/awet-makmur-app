<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-green-10">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input outlined v-model="propsPayment.val" label="Metode Pembayaran" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" />
        <q-input outlined v-model="propsPayment.description" label="Deskripsi &sol; No. Rekening" />

      </q-card-section>
      <q-card-actions class="bg-white text-green">
        <q-btn v-if="propsPayment.id" flat color="negative" label="Hapus" @click="deleteList(propsPayment.id)" />
        <q-space />
        <q-btn flat color="green-10" label="Simpan" type="submit" />
        <q-btn flat color="green-10" label="Gagal" v-close-popup />
      </q-card-actions>
    </q-form>
    <!-- <pre>{{ propsCategory }}</pre> -->
  </q-card>
</template>
<script setup>
import { ref, reactive } from "vue";
import { notifySuccess, notifyError } from "src/utils/notify";
import { forceRerender } from "src/utils/buttons-click";
import { apiTokened } from "src/config/api";
import toArray from "src/utils/to-array";

const props = defineProps({
  isNew: { type: Boolean, default: false },
  payment: { type: Object, default: null },
});
const propsPayment = reactive({
  id: null,
  val: "",
  description: "",
});
Object.assign(propsPayment, props.payment);

const title = ref("Pembayaran");
if (props.isNew) {
  title.value = "Tambah Pembayaran";
} else {
  title.value = "Edit Pembayaran";
}

const onSubmit = async () => {
  const data = {
    var: "payment-method",
    val: propsPayment.val,
    description: propsPayment.description,
  };

  try {
    const response = null
    if (props.isNew) response = await apiTokened.post(`lists`, data);
    else response = await apiTokened.put(`lists/${propsPayment.id}`, data);
    notifySuccess(response.data.message);
  } catch (error) {
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  } finally {
    forceRerender();
  }
};

const deleteList = async (id) => {
  const isConfirmed = true
  if (isConfirmed) {
    try {
      const response = await apiTokened.delete(`lists/${id}`);
      notifySuccess(response.data.message);
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    } finally {
      forceRerender();
    }
  }
}
</script>
