<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-teal-10">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input outlined v-model="propsStore.name" label="Nama" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" />
        <q-input outlined v-model="propsStore.address" label="Alamat" />

      </q-card-section>
      <q-card-actions class="bg-white text-teal">
        <q-btn v-if="propsStore.id" flat color="negative" label="Hapus" @click="deleteStore(propsStore.id)" />
        <q-space />
        <q-btn flat color="teal-10" label="Simpan" type="submit" />
        <q-btn flat color="teal-10" label="Gagal" v-close-popup />
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
  store: { type: Object, default: null },
});
const propsStore = reactive({
  id: null,
  name: "",
  address: "",
});
Object.assign(propsStore, props.store);

const title = ref("Toko");
if (props.isNew) {
  title.value = "Tambah Toko";
} else {
  title.value = "Edit Toko";
}

const onSubmit = async () => {
  const data = {
    name: propsStore.name,
    address: propsStore.address,
  };

  try {
    const response = null
    if (props.isNew) response = await apiTokened.post(`stores`, data);
    else response = await apiTokened.put(`stores/${propsStore.id}`, data);
    notifySuccess(response.data.message);
  } catch (error) {
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  } finally {
    forceRerender();
  }
};

const deleteStore = async (id) => {
  const isConfirmed = true
  if (isConfirmed) {
    try {
      const response = await apiTokened.delete(`stores/${id}`);
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
