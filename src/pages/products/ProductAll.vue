<template>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered v-for="(product, index) in products" :key="index">
      <q-card-section class="q-pt-xs">
        <div class="text-overline">{{ product.brand }}</div>
        <div class="text-h6 q-mt-xs q-mb-xs">{{ product.name }}</div>
        <div class="text-subtitle q-mt-xs q-mb-xs">
          Rp{{ digitSeparator(product.selling_price) }}
        </div>
        <q-card-section horizontal class="q-mt-md">
          <q-img class="flex flex-center col-4 q-mr-md img" src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <div>
            <!-- <div class="text-caption text-grey">Toko A: {{ product.stocks[0].stock }}</div> -->
            <div class="text-caption text-grey">{{ product.description }}</div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions class="bg-teal-1">
        <div class="text-caption q-ml-sm">Tersisa: {{ product.total_stock ? product.total_stock : 0 }} item</div>
        <q-space />
        <q-btn color="teal-10" flat icon-right="info" label="Detail" :to="/products/ + product.id" />
        <q-btn color="teal-10" flat icon-right="add_shopping_cart" label="Order" />
      </q-card-actions>
    </q-card>
  </div>

  <!-- <pre>{{ products }}</pre> -->
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import digitSeparator from "src/utils/digit-separator";

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
<style lang="scss" scoped>
.my-card {
  width: 100%;
}

.img {
  max-height: 150px;
}
</style>
