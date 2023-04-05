<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered v-for="(product, index) in products" :key="index">
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ product.brand }}</div>
        <div class="text-h6 q-mt-xs q-mb-xs">{{ product.name }}</div>
        <div class="text-subtitle q-mt-xs q-mb-xs">
          Rp{{ product.selling_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
        </div>
        <q-card-section horizontal class="q-mt-md">
          <q-img class="flex flex-center col-4 q-mr-md" src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <div>
            <!-- <div class="text-caption text-grey">Toko A: {{ product.stocks[0].stock }}</div> -->
            <div class="text-caption text-grey">{{ product.description }}</div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-teal-1">
        <q-btn flat :to="/products/ + product.id">Detail</q-btn>
        <q-btn flat color="primary">Reserve</q-btn>
      </q-card-actions>
    </q-card>
  </div>

  <!-- <pre>{{ products }}</pre> -->
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const params = ref(route.params)
const products = reactive([])
try {
  const response = await apiTokened.get(`products/categories/${params.value.category}`);
  Object.assign(products, response.data.data.products);
} catch (error) {
  console.log("Not Found: product -> list", error.response);
}

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
