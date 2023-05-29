<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
        <div class="text-subtitle1">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
        <q-input outlined v-model="propsStore.name" label="Nama" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" hint="Nama Toko" />
        <q-input outlined v-model="propsStore.address" label="Alamat" hint="Alamat singkat" />
        <q-input outlined v-model="propsStore.address_full" label="Alamat Lengkap" autogrow
          hint="Termasuk nomor telepon" />

      </q-card-section>
      <q-card-actions align="right" class="bg-green-7">
        <q-btn v-if="propsStore.id" color="negative" label="Hapus" @click="deleteStore(propsStore.id)" />
        <q-space />
        <q-btn color="green-10" label="Simpan" type="submit" />
        <q-btn color="secondary" label="Gagal" v-close-popup />
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
import { useQuasar } from "quasar";

const props = defineProps({
  isNew: { type: Boolean, default: false },
  store: { type: Object, default: null },
});
const propsStore = reactive({
  id: null,
  name: "",
  address: "",
  address_full: "",
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
    address_full: propsStore.address_full,
  };

  try {
    let response = null
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

const $q = useQuasar();
const deleteStore = async (id) => {
  $q.dialog({
    title: "Konfirmasi",
    message: `<span style="color:'red'">Hapus toko ini?</span>`,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
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
  })
}
</script>
