<template>
  <div class="q-pa-sm">
    <q-card class="my-card q-mb-sm" flat bordered v-for="(product, index) in products" :key="index">
      <q-card-section class="q-pt-xs no-padding">
        <q-item clickable v-ripple :to="/products/ + product.id" class="q-pa-sm bg-teal-3 text-teal-10">
          <q-item-section class="">
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle text-teal-9">
              Rp{{ digitSeparator(product.selling_price) }} ({{
                product.brand
              }}
              &mdash; {{ product.supplier }})
            </div>
          </q-item-section>
        </q-item>
        <q-card-section horizontal class="q-ma-sm">
          <div v-if="product.image_last">
            <q-img class="flex flex-center col-4 q-mr-sm img" :src="product.image_url + product.image_last" />
          </div>
          <div v-else>
            <q-img class="flex flex-center col-4 q-mr-sm img" src="https://picsum.photos/100/100.webp" />
          </div>
          <div>
            <div class="text-caption text-teal-9">
              <span v-html="product.description" class="description"></span>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions class="bg-teal-2 q-pa-xs">
        <div class="text-caption q-ml-xs text-teal-10">
          Tersisa: {{ product.total_stock ? product.total_stock : 0 }} item
        </div>
        <q-space />
        <q-btn color="teal-10" flat icon-right="add_shopping_cart" label="Order" @click="addToCart(product)" />
      </q-card-actions>
    </q-card>
  </div>
  <div class="q-mr-md q-mb-xl q-gutter-md text-right">
    <q-btn push color="teal" round icon="add" @click="showModalProduct = true" />
    <q-btn push color="teal" round icon="search" @click="showModalSearch = true" />
  </div>

  <q-dialog v-model="showModalProduct">
    <ModalProduct :is-new="true" />
  </q-dialog>

  <q-dialog v-model="showModalSearch">
    <ModalSearch />
  </q-dialog>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from "vue";
import { useRoute, } from "vue-router";
import digitSeparator from "src/utils/digit-separator";
import ordersStore from "src/stores/orders-store";
import ModalProduct from "./ModalProduct.vue";
import ModalSearch from "./ProductSearch.vue";

const showModalProduct = ref(false);
const showModalSearch = ref(false);
const route = useRoute();
const params = ref(route.params);
const products = reactive([]);
try {
  const response = await apiTokened.get(
    `products/categories/${params.value.category}`
  );
  Object.assign(products, response.data.data.products);
} catch (error) {
  console.log("Not Found: product -> list", error.response);
}

const addToCart = (product) => {
  ordersStore().addOrder(product)
}

</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
}

.img {
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
}

.description {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
