<template>
  <q-card class="q-ma-md">
    <img src="https://cdn.quasar.dev/img/mountains.jpg">
    <q-card-section>
      <div class="text-caption">Kategori: {{ product.category_name }} &mdash; Kode: {{ product.code }}</div>
      <div class="text-h6">{{ product.name }}</div>
      <div class="text-subtitle2">
        Harga Jual: Rp{{ product.selling_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle2">Deskripsi:</div>
      {{ product.description }}
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-h6">Data</div>
      {{ product }}
    </q-card-section>
  </q-card>


  <pre>{{ product }}</pre>
  <pre>{{ stocks }}</pre>
  <pre>{{ images }}</pre>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const params = ref(route.params)
const product = reactive({})
const stocks = reactive([])
const images = reactive([])
try {
  const response = await apiTokened.get(`products/${params.value.id}`);
  Object.assign(product, response.data.data.product);
  Object.assign(stocks, response.data.data.stocks);
  Object.assign(images, response.data.data.images);
} catch (error) {
  console.log("Not Found: product -> list", error.response);
}

</script>
<style lang="scss" scoped></style>
