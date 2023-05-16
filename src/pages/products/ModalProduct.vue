<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-form method="post" @submit.prevent="onSubmit">
      <q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
        <div class="text-subtitle1">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
        <!-- <q-input outlined v-model="id" label="ID" readonly dense /> -->
        <!-- <q-input outlined v-model="code" label="Kode" /> -->
        <q-input outlined v-model="name" label="Nama" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
        <q-input outlined v-model="brand" label="Merek" />
        <!-- <q-input outlined v-model="supplier" label="Pemasok/Supplier" /> -->
        <q-input outlined v-model="base_price" label="Harga Dasar" type="number" :rules="[val => !!val || 'Harus diisi!']"
          error-color="red-6" />
        <q-input outlined v-model="selling_price" label="Harga Jual" type="number"
          :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
        <q-select outlined v-model="category_id" :options="listCategories" option-value="id" option-label="name"
          label="Kategori" emit-value map-options :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
      </q-card-section>
      <q-card-actions class="bg-green-7">
        <q-btn v-if="id" color="negative" label="Hapus" @click="deleteProduct(id)" />
        <q-space />
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
  isNew: { type: Boolean, default: false },
  product: { type: Object, default: null },
});
const copyProduct = reactive({
  id: null,
  code: "",
  name: "",
  brand: "",
  supplier: "",
  base_price: null,
  selling_price: null,
  category_id: null,
});
Object.assign(copyProduct, props.product);
const {
  id,
  code,
  name,
  brand,
  supplier,
  base_price,
  selling_price,
  category_id,
} = toRefs(copyProduct);

const title = ref("Produk");
if (props.isNew) {
  title.value = "Tambah Produk";
} else {
  title.value = "Edit Produk";
}

const listCategories = reactive([]);
try {
  const response = await apiTokened.get(`categories`);
  Object.assign(listCategories, response.data.data.categories);
} catch (error) {
  console.log("Not Found: categories -> list", error.response);
}

const onSubmit = async () => {
  const data = {
    code: code.value.trim(),
    name: name.value.trim(),
    brand: brand.value.trim(),
    supplier: supplier.value.trim(),
    base_price: base_price.value,
    selling_price: selling_price.value,
    category_id: category_id.value,
  };
  if (props.isNew) {
    try {
      const response = await apiTokened.post(`products`, data);
      const id = response.data.data.product.id
      notifySuccess(response.data.message);
      router.push(`/products/${id}`)
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    }
  }

  if (!props.isNew) {
    try {
      const response = await apiTokened.put(`products/${id.value}`, data);
      notifySuccess(response.data.message);
      forceRerender();
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    }
  }
};

const $q = useQuasar();
const deleteProduct = async (id) => {
  $q.dialog({
    title: "Konfirmasi",
    message: `<span style="color:'red'">Hapus produk?</span>`,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
    try {
      const response = await apiTokened.delete(`products/${id}`);
      notifySuccess(response.data.message);
      router.go(-1)
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    }
  })
}
</script>
