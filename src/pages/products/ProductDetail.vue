<template>
  <q-card class="q-ma-sm">
    <q-card-section class="no-padding">
      <q-img style="max-height: 50vh; object-fit: cover;" src="https://cdn.quasar.dev/img/mountains.jpg">
        <q-btn push round color="teal" icon="edit" class="absolute all-pointer-events" style="bottom: 8px; right: 8px" />
      </q-img>
    </q-card-section>
    <q-card-section>
      <div class="text-caption">
        {{ product.category_name }} / {{ product.code }} / {{ product.total_stock ? product.total_stock : 0 }}
        item
      </div>
      <div class="row">
        <div class="text-h6">{{ product.name }}</div>
        <q-space />
        <q-btn color="teal-10" flat icon-right="add_shopping_cart" label="Order" />
      </div>
      <div class="text-subtitle2">
        Rp{{ digitSeparator(product.selling_price) }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row items-center">
        <div class="text-body1">Deskripsi:</div>
        <q-space />
        <q-btn color="teal-10" flat icon-right="edit" label="Edit" @click="showModalDescription = true" />
      </div>
      <span class="text-teal-10 text-caption" v-html="product.description"></span>
    </q-card-section>
    <q-card-section class="q-pt-none data">
      <q-markup-table class="text-teal-10">
        <thead>
          <tr class="bg-teal-1">
            <th class="text-left">
              <div class="text-body1">Data Produk</div>
            </th>
            <th class="text-right">
              <q-btn color="teal-10" flat icon-right="edit" label="Edit" @click="showModalProduct = true" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">ID</td>
            <td class="text-left">{{ product.id }}</td>
          </tr>
          <tr>
            <td class="text-left">Kode</td>
            <td class="text-left">{{ product.code }}</td>
          </tr>
          <tr>
            <td class="text-left">Nama</td>
            <td class="text-left">{{ product.name.toUpperCase() }}</td>
          </tr>
          <tr>
            <td class="text-left">Merek</td>
            <td class="text-left">{{ product.brand }}</td>
          </tr>
          <tr>
            <td class="text-left">Pemasok</td>
            <td class="text-left">{{ product.supplier }}</td>
          </tr>
          <tr>
            <td class="text-left">Kategori</td>
            <td class="text-left">{{ product.category_name }}</td>
          </tr>
          <tr>
            <td class="text-left">Harga Dasar</td>
            <td class="text-right">Rp{{ digitSeparator(product.base_price) }}</td>
          </tr>
          <tr>
            <td class="text-left">Biaya Tambahan</td>
            <td class="text-right">Rp{{ digitSeparator(product.cost) }}</td>
          </tr>
          <tr>
            <td class="text-left">Harga Jual</td>
            <td class="text-right">Rp{{ digitSeparator(product.selling_price) }}</td>
          </tr>
          <tr>
            <td class="text-left">Keuntungan</td>
            <td class="text-right">Rp{{ digitSeparator(margin) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-markup-table class="text-teal-10 q-mt-md">
        <thead>
          <tr class="bg-teal-1">
            <th class="text-left">
              <div class="text-body1">Stock</div>
            </th>
            <th class="text-right">
              <q-btn color="teal-10" flat icon-right="edit" label="Edit" @click="showModalStock = true" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in stocks" :key="index">
            <td class="text-left">{{ stock.store_name }}</td>
            <td class="text-left">{{ stock.stock }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showModalDescription">
    <modal-description :product-description="product.description" :product-id="parseInt(product.id)" />
  </q-dialog>

  <q-dialog v-model="showModalStock">
    <modal-stock :product-id="parseInt(product.id)" />
  </q-dialog>

  <q-dialog v-model="showModalProduct">
    <modal-product :is-new="false" :product="product" />
  </q-dialog>
</template>

<script setup>
import digitSeparator from '../../utils/digit-separator'
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import toArray from '../../utils/to-array';
import ModalDescription from './ModalDescription.vue';
import ModalProduct from './ModalProduct.vue';
import ModalStock from './ModalStock.vue';

const route = useRoute()
const params = ref(route.params)
const product = reactive({})
const stocks = reactive([])
const images = reactive([])
const margin = ref(0);
const showModalDescription = ref(false);
const showModalProduct = ref(false);
const showModalStock = ref(false);

try {
  const response = await apiTokened.get(`products/${params.value.id}`);
  Object.assign(product, response.data.data.product);
  Object.assign(stocks, response.data.data.stocks);
  Object.assign(images, response.data.data.images);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message)
  })
}
margin.value = product.selling_price - product.cost - product.base_price
</script>
<style lang="scss" scoped>
.data {
  max-width: 500px;
}
</style>
