<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-form action="https://some-url.com" method="post" @submit.prevent="onSubmit">
      <q-card-section>
        <div class="text-h6 text-teal-10">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-gutter-md">
        <q-input outlined v-model="id" label="ID" class="disabled" />
        <q-input outlined v-model="code" label="Kode" />
        <q-input outlined v-model="name" label="Nama" />
        <q-input outlined v-model="brand" label="Merek" />
        <q-input outlined v-model="supplier" label="Pemasok/Supplier" />
        <q-select outlined v-model="category_id" :options="listCategories" label="Kategori" />
      </q-card-section>

      <pre>
                                                          {{ category_id }}
                                                      </pre>

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
const copyProduct = reactive({ id: null, code: '', name: '', brand: '', supplier: '', category_id: null });
Object.assign(copyProduct, props.product)
const { id, code, name, brand, supplier, category_id } = toRefs(copyProduct)

const listCategories = [
  { label: 'Kasur', value: '1', },
  { label: 'Lemar', value: '2', },
]

const categories = ref()

const title = ref('Produk');
if (props.isNew) {
  title.value = "Tambah Produk";
} else {
  title.value = "Edit Produk";
}

// const id = ref(props.productId)
const onSubmit = async () => {
  try {
    const response = await apiTokened.put(`products/${id.value}`, {
      description: textDescription.value
    });
    // console.log(response);
    notifySuccess(response.data.message)
  } catch (error) {
    // console.log(error);
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message)
    })
  } finally {
    forceRerender()
  }
}

</script>
