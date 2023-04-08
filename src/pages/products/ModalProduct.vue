<template>
  <q-card style="width: 700px; max-width: 90vw;">
    <q-form method="post" @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-teal-10">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input outlined v-model="id" label="ID" readonly dense />
        <q-input outlined v-model="code" label="Kode" />
        <q-input outlined v-model="name" label="Nama" />
        <q-input outlined v-model="brand" label="Merek" />
        <q-input outlined v-model="supplier" label="Pemasok/Supplier" />
        <q-input outlined v-model="base_price" label="Harga Dasar" type="number" />
        <q-input outlined v-model="cost" label="Biaya Tambahan" type="number" />
        <q-input outlined v-model="selling_price" label="Harga Jual" type="number" />
        <q-select outlined v-model="category_id" :options="listCategories" option-value="id" option-label="name"
          label="Kategori" emit-value map-options />
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="teal-10" label="Simpan" type="submit" />
        <q-btn flat color="teal-10" label="Gagal" v-close-popup />
      </q-card-actions>
    </q-form>
  </q-card>
</template>
<script setup>
import { ref, toRefs, reactive } from 'vue';
import { notifySuccess, notifyError } from '../../utils/notify';
import { forceRerender } from '../../utils/buttons-click'
import { apiTokened } from "../../config/api";
import toArray from '../../utils/to-array';

const props = defineProps({
  isNew: { type: Boolean, default: false },
  product: { type: Object }
})
const copyProduct = reactive({ id: null, code: '', name: '', brand: '', supplier: '', base_price: null, cost: null, selling_price: null, category_id: null, });
Object.assign(copyProduct, props.product)
const { id, code, name, brand, supplier, base_price, cost, selling_price, category_id } = toRefs(copyProduct)

const title = ref('Produk');
if (props.isNew) { title.value = "Tambah Produk"; }
else { title.value = "Edit Produk"; }

const listCategories = reactive([])
try {
  const response = await apiTokened.get(`categories`);
  Object.assign(listCategories, response.data.data.categories);
} catch (error) {
  console.log("Not Found: categories -> list", error.response);
}

const onSubmit = async () => {
  const data = {
    code: code.value,
    name: name.value,
    brand: brand.value,
    supplier: supplier.value,
    base_price: base_price.value,
    cost: cost.value,
    selling_price: selling_price.value,
    category_id: category_id.value
  }
  if (!props.isNew) {
    try {
      const response = await apiTokened.put(`products/${id.value}`, data);
      // console.log(response);
      notifySuccess(response.data.message)
      forceRerender()
    } catch (error) {
      // console.log(error);
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message)
      })
    }
  }
}

</script>
