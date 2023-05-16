<template>
  <div class="q-ma-sm">
    <BannerTitle>
      <template #title>
        <div class="text-h6 text-weight-light">Data Stok</div>
        <div class="text-subtitle1 ">{{ storeName }}</div>
      </template>
    </BannerTitle>
    <div class="q-mt-sm">
      <div v-if="stocks.length > 0">
        <q-table :rows="stocks" row-key="id" :columns="columns" :filter="filter"
          @row-click="(event, row) => $router.push(`/products/${row.id}`)" class="text-green-10 ">
          <template v-slot:top>
            <q-input debounce="500" v-model="filter" placeholder="Cari">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
        <q-card class="q-mt-sm bg-green-7">
          <q-card-section class="text-body1 text-green-11 text-center text-italic q-pb-none">
            <p class="no-margin">Total Stok: {{ digitSeparator(getItems()) }} item, <br /> dengan nilai: <span
                class="text-bold">Rp{{
                  digitSeparator(getTotal())
                }}</span> </p>
          </q-card-section>
          <q-card-section>
            <q-btn color="green-10" class="text-green-11 full-width" label="Hitung Zakat" icon="card_giftcard"
              @click="showModalZakat = true" />
          </q-card-section>
        </q-card>
      </div>
      <div v-else>
        <q-banner class="bg-red-2 text-red-10 q-ma-md">
          <div class="text-body1 text-center">Tidak ada data untuk ditampilkan!</div>
        </q-banner>
      </div>
    </div>
  </div>
  <q-dialog v-model="showModalZakat">
    <ModalZakat :asset="getTotal()" @close-modal="() => showModalZakat = false">
      <template v-slot:store>
        Toko {{ storeName }}
      </template>
    </ModalZakat>
  </q-dialog>

  <!-- <pre>{{ stocks }}</pre> -->
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import digitSeparator from 'src/utils/digit-separator';
import { notifyError } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ModalZakat from './ModalZakat.vue'
import BannerTitle from 'src/components/BannerTitle.vue';

const stocks = reactive([]);
const params = ref(useRoute().params);
const filter = ref('')
const storeName = ref('')
const showModalZakat = ref(false)

try {
  const responseStock = await apiTokened.get(`stores/${params.value.id}/stocks`);
  Object.assign(stocks, responseStock.data.data.stocks);
  if (stocks.length > 0) storeName.value = stocks[0].store_name
} catch (error) {
  console.log(error);
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}

const getTotal = () => stocks.reduce((acc, stock) => acc + Number(stock.product_worth), 0)
const getItems = () => stocks.reduce((acc, stock) => acc + Number(stock.stock), 0)
const columns = [
  { name: "product", field: row => row.name + (row.brand.length > 1 ? " (" + row.brand + ")" : ""), label: "Nama", align: "left", sortable: true, },
  { name: "base_price", field: "base_price", label: "Harga Dasar", align: "right", format: (val, row) => `Rp${digitSeparator(val)}`, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: "stock", field: "stock", label: "Stok", align: "right", sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: "product_worth", field: "product_worth", label: "Harga x Stok", align: "right", format: (val, row) => `Rp${digitSeparator(val)}` },
]

</script>
