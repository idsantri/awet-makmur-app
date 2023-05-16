<template>
  <div class="q-ma-sm">
    <BannerTitle>
      <template #title>
        <div class="text-h6 text-weight-light">Data Transaksi</div>
        <div class="text-subtitle1 ">{{ storeName }}</div>
      </template>
    </BannerTitle>

    <div v-if="orders.length > 0" class="q-mt-sm">
      <q-table :rows="orders" row-key="id" :columns="columns" :filter="filter"
        @row-click="(event, row) => $router.push(`/orders/${row.id}`)" class="text-green-10">
        <template v-slot:top>
          <q-input debounce="500" v-model="filter" placeholder="Cari">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <div v-else>
      <q-banner class="bg-red-2 text-red-10 q-ma-md">
        <div class="text-body1 text-center">Tidak ada data untuk ditampilkan!</div>
      </q-banner>
    </div>
  </div>
  <!-- <pre>{{ orders }}</pre> -->
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import digitSeparator from 'src/utils/digit-separator';
import { notifyError } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { simpleDate } from 'src/utils/format-date'
import BannerTitle from 'src/components/BannerTitle.vue';

const columns = [
  { name: "created_at", field: "created_at", label: "Tanggal", align: "left", format: (val, row) => `${simpleDate(val)}`, sortable: true, },
  { name: "customer", field: row => `${row.customer_name} (${row.customer_address}; ${row.customer_phone})`, label: "Pelanggan", align: "left", sortable: true, },
  { name: "payment", field: "payment", label: "Pembayaran", align: "left", sortable: true, },
  { name: "sum_selling_price", field: "sum_selling_price", label: "Nominal Transaksi", align: "right", format: (val, row) => `Rp${digitSeparator(val)}`, sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
]

const orders = reactive([]);
const params = ref(useRoute().params);
const filter = ref('')
const storeName = ref('')

try {
  const responseOrder = await apiTokened.get(`stores/${params.value.id}/orders`);
  Object.assign(orders, responseOrder.data.data.orders);
  if (orders.length > 0) storeName.value = orders[0].store_name
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}
</script>
