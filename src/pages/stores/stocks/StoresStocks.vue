<template>
  <div class="q-pa-md">
    <q-table :title="'Stok Toko ' + storeName" :rows="stocks" row-key="id" :columns="columns" :filter="filter"
      @row-click="navigateToDetail">
      <template v-slot:top-right>
        <q-input debounce="500" v-model="filter" placeholder="Cari">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <q-card class="q-mt-md bg-teal-2">
      <q-card-section class="text-body1 text-teal-10 text-center text-italic">
        <p class="no-margin">Total Stok: {{ digitSeparator(getItems()) }} item, <br /> dengan nilai: <span
            class="text-bold">Rp{{
              digitSeparator(getTotal())
            }}</span> </p>
      </q-card-section>
    </q-card>
    <div class="q-mt-lg">
      <q-btn push color="teal" round icon="card_giftcard" />
      <span class="text-body2 text-teal-10 q-ml-sm">
        Hitung Zakat
      </span>
    </div>
  </div>
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import digitSeparator from 'src/utils/digit-separator';
import { notifyError } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const stocks = reactive([]);
const params = ref(useRoute().params);
const filter = ref('')
const storeName = ref('')

try {
  const response = await apiTokened.get(`stores/${params.value.id}/stocks`);
  Object.assign(stocks, response.data.data.stocks);
  stocks.forEach((stock) => {
    stock.stock_calc = stock.stock * stock.base_price
    stock.product_detail = stock.name + (stock.brand.length > 1 ? " (" + stock.brand + ")" : "")
  })

  const responseStore = await apiTokened.get(`stores/${params.value.id}`);
  storeName.value = responseStore.data.data.store.name
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}

const getTotal = () => stocks.reduce((acc, stock) => acc + stock.stock_calc, 0)
const getItems = () => stocks.reduce((acc, stock) => acc + parseInt(stock.stock), 0)

const columns = [
  { name: "name", field: "product_detail", label: "Nama", align: "left" },
  { name: "base_price", field: "base_price", label: "Harga Dasar", align: "right", format: (val, row) => `Rp${digitSeparator(val)}` },
  { name: "stock", field: "stock", label: "Stok", align: "right", sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: "stock_calc", field: "stock_calc", label: "Harga x Stok", align: "right", format: (val, row) => `Rp${digitSeparator(val)}` },
]

const router = useRouter();
const navigateToDetail = (event, row) => {
  router.push(`/products/${row.id}`)
}
</script>
