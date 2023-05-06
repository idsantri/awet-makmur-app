<template>
  <q-card class="q-ma-md text-teal-10">
    <q-card-section>
      <q-markup-table class="text-teal-10" flat bordered="">
        <tbody>
          <tr>
            <td>Toko</td>
            <td>{{ order.store_name }} ({{ order.store_address }})</td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td>{{ simpleDate(order.created_at) }}</td>
          </tr>
          <tr>
            <td>Pelanggan</td>
            <td>{{ order.customer_name }} ({{ order.customer_address }}; {{ order.customer_phone }})</td>
          </tr>
          <tr>
            <td>Pembayaran</td>
            <td>{{ order.payment }}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="text-bold">Rp{{ digitSeparator(order.sum_selling_price) }}</td>
          </tr>
          <tr>
            <td>Catatan</td>
            <td>{{ order.note }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-list bordered separator>
        <q-item-label header overline class="q-py-sm">Data Produk</q-item-label>
        <q-item clickable v-ripple v-for="(detail, index) in order.order_detail" :key="index"
          @click="$router.push('/products/' + detail.product_id)">
          <q-item-section>
            <q-item-label>{{ detail.product_name }} {{ detail.product_brand ? ' (' + detail.product_brand + ')' : ''
            }}</q-item-label>
            <q-item-label caption>
              <q-markup-table flat dense class="text-teal-10">
                <tbody>
                  <tr>
                    <td>Harga (Rp{{ digitSeparator(detail.selling_price) }} x {{ detail.quantity }})</td>
                    <td class="text-right">Rp{{ digitSeparator(Number(detail.selling_price) *
                      Number(detail.quantity))
                    }}</td>
                  </tr>
                  <tr>
                    <td>Diskon</td>
                    <td class="text-right">Rp{{ digitSeparator(detail.discount) }}</td>
                  </tr>
                  <tr>
                    <td>Biaya Tambahan</td>
                    <td class="text-right">Rp{{ digitSeparator(detail.cost) }}</td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td class="text-right text-bold">Rp{{ digitSeparator(detail.price_amount) }}</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-item-label>
          </q-item-section>
          <QSeparator dark />
        </q-item>

      </q-list>
    </q-card-section>
  </q-card>
  <!-- <pre>{{ order.order_detail }}</pre> -->
</template>

<script setup>
import { apiTokened } from 'src/config/api';
import { notifyError } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { simpleDate } from 'src/utils/format-date'
import digitSeparator from 'src/utils/digit-separator';

const order = reactive({})
const params = ref(useRoute().params);
try {
  const response = await apiTokened.get(`orders/${params.value.id}`);
  Object.assign(order, response.data.data.order);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}
</script>
