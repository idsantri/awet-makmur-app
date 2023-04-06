<template>
  <q-card class="q-ma-md">
    <q-card-section class="no-padding">
      <q-img style="max-height: 50vh; object-fit: cover;" src="https://cdn.quasar.dev/img/mountains.jpg">
        <q-btn push round color="teal" icon="edit" class="absolute all-pointer-events" style="bottom: 8px; right: 8px" />
      </q-img>
    </q-card-section>
    <q-card-section>
      <div class="text-caption">
        {{ product.category_name }} / {{ product.code }} / tersisa: {{ product.total_stock ? product.total_stock : 0 }}
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

    <q-card-section class="q-pt-none row items-center">
      <div class="text-body1">Deskripsi:</div>
      <q-space />
      <q-btn color="teal-10" flat icon-right="edit" label="Edit" />
      {{ product.description }}
    </q-card-section>
    <q-card-section class="q-pt-none data">
      <q-markup-table>
        <thead>
          <tr class="bg-teal-1">
            <th class="text-left">
              <div class="text-h6">DATA</div>
            </th>
            <th class="text-right">
              <q-btn color="teal-10" flat icon-right="edit" label="Edit" />
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
            <td class="text-left">Biaya</td>
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
        <thead>
          <tr class="bg-teal-1">
            <th class="text-left">
              <div class="text-body1">Stock</div>
            </th>
            <th class="text-right">
              <q-btn color="teal-10" flat icon-right="edit" label="Edit" />
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
</template>

<script setup>
import digitSeparator from '../../utils/digit-separator'
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const params = ref(route.params)
const product = reactive({})
const stocks = reactive([])
const images = reactive([])
const margin = ref(0);
const total_stock = ref(0);

try {
  const response = await apiTokened.get(`products/${params.value.id}`);
  Object.assign(product, response.data.data.product);
  Object.assign(stocks, response.data.data.stocks);
  Object.assign(images, response.data.data.images);
} catch (error) {
  console.log("Not Found: product -> list", error.response);
}
margin.value = product.selling_price - product.cost - product.base_price

</script>
<style lang="scss" scoped>
.data {
  max-width: 500px;
}
</style>
