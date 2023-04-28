<template>
  <div class="q-pa-md">
    <q-table :title="'Stok Toko ' + storeName" :rows="stocks" row-key="id" :columns="columns" :filter="filter">
      <template v-slot:top-right>
        <q-input debounce="500" v-model="filter" placeholder="Cari">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
  <pre>{{ digitSeparator(getItems()) }}</pre>
  <pre>{{ digitSeparator(getTotal()) }}</pre>
  <pre>{{ stocks }}</pre>
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import digitSeparator from 'src/utils/digit-separator';
import { notifyError } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const stocks = reactive([]);
const params = ref(useRoute().params);
const filter = ref('')
const storeName = ref('')
try {
  const response = await apiTokened.get(`stores/${params.value.id}/stocks`);
  Object.assign(stocks, response.data.data.stocks);
  const responseStore = await apiTokened.get(`stores/${params.value.id}`);
  storeName.value = responseStore.data.data.store.name
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}
stocks.forEach((stock) => {
  stock.stock_calc = stock.stock * stock.base_price
  stock.base_price = stock.base_price
  stock.selling_price = stock.selling_price
})

const getTotal = () => stocks.reduce((acc, stock) => acc + stock.stock_calc, 0)
const getItems = () => stocks.reduce((acc, stock) => acc + parseInt(stock.stock), 0)

const columns = [
  { name: "code", field: "code", label: "Kode", align: "left" },
  { name: "name", field: "name", label: "Nama", align: "left" },
  { name: "base_price", field: "base_price", label: "Harga Dasar", align: "right", format: (val, row) => `Rp${digitSeparator(val)}` },
  // { name: "selling_price", field: "selling_price", label: "Harga Jual", align: "right", format: (val, row) => `Rp${digitSeparator(val)}` },
  { name: "stock", field: "stock", label: "Stok", align: "right", sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: "stock_calc", field: "stock_calc", label: "Harga x Stok", align: "right", format: (val, row) => `Rp${digitSeparator(val)}` },

]
</script>
