<template>
  <div class="q-ma-sm">
    <BannerTitle>
      <template #title>
        <h2 class="no-margin text-green-11 text-h6 text-weight-light">
          Kategori:
          <span v-if="products.length > 0">{{ products[0].category_name }}</span>
          <span v-else>{{ titleCase($route.params.category) }}</span>
        </h2>
      </template>
      <template #buttons>
        <q-btn square padding="sm" color="green-12" class="text-green-10 q-ml-sm" icon="add"
          @click="showModalProduct = true" />
        <q-btn square padding="sm" color="green-13" class="text-green-10 q-ml-sm" icon="search"
          @click="showModalSearch = true" />
      </template>
    </BannerTitle>
    <div v-if="!products.length > 0">
      <q-banner class="bg-red-2 text-red-10 q-mt-sm">
        <div class="text-body1 text-center">Tidak ada data untuk ditampilkan!</div>
      </q-banner>
    </div>
    <q-card v-else class="my-card q-my-sm" flat bordered v-for="(product, index) in products" :key="index">
      <q-card-section class="q-pt-xs no-padding">
        <q-item clickable v-ripple :to="/products/ + product.id" class="q-pa-sm bg-green-7 text-green-11">
          <q-item-section class="">
            <div class="text-h6">{{ product.name }} <span v-show="product.brand" class="text-body2 text-italic">&mdash;
                {{ product.brand }}</span> </div>
            <div class="text-subtitle2 text-green-12">Rp{{ digitSeparator(product.selling_price) }}</div>
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
            <div class="text-caption text-green-9">
              <span v-html="product.description" class="description"></span>
              <pre>{{ product.stocks }}</pre>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions class="bg-green-6 q-pa-xs">
        <div class="text-caption q-ml-xs text-green-11">
          Tersisa: {{ product.total_stock ? product.total_stock : 0 }} item
        </div>
        <q-space />
        <q-btn color="green-11" class="text-green-10" no-caps icon-right="add_shopping_cart" label="Jual"
          @click="addToCart(product)" />
      </q-card-actions>
    </q-card>
  </div>
  <!-- <div class="q-mr-md q-mb-xl q-gutter-md text-right">
    <q-btn push color="green" round icon="add" @click="showModalProduct = true" />
    <q-btn push color="green" round icon="search" @click="showModalSearch = true" />
  </div> -->

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
import BannerTitle from "src/components/BannerTitle.vue";
import titleCase from "src/utils/tittle-case";

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
  // console.log(products);
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
