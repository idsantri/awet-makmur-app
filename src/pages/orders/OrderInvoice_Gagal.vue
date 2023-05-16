<template>
  <q-card class="text-black" id="invoice">
    <q-card-section class="no-padding q-ma-md">
      <div class="text-h6">Toko {{ order.store_name }}</div>
      <div class="text-caption q-mb-md"> {{ order.store_address }}</div>
      <q-separator />
      <div class="text-h5 text-center">Contoh INVOICE 1</div>
      <div class="text-caption text-center">{{ fullDate(order.created_at) }}</div>
      <q-separator />
    </q-card-section>
    <q-card-section class="no-padding q-ma-md">
      <table>
        <tr>
          <td>Nama Pemesan:</td>
          <td class="text-uppercase">{{ order.customer_name }}</td>
        </tr>
        <tr>
          <td>Alamat Pengiriman:</td>
          <td>{{ order.customer_address }}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td class="text-bold">Rp{{ digitSeparator(order.sum_selling_price) }}</td>
        </tr>
        <tr>
          <td class="text-italic" colspan="2">{{ order.note }}</td>
        </tr>
      </table>
    </q-card-section>
    <q-card-section class="no-padding q-ma-md">
      <q-list bordered separator>
        <q-item-label header overline class="q-py-sm">Data Produk</q-item-label>
        <q-item v-for="(detail, index) in order.order_detail" :key="index">
          <q-item-section>
            <q-item-label>{{ detail.product_name }} {{ detail.product_brand ? ' (' + detail.product_brand + ')' : ''
            }}</q-item-label>
            <q-item-label caption>
              <q-markup-table flat dense>
                <tbody class="text-caption">
                  <tr>
                    <td>Harga (Rp{{ digitSeparator(detail.product_selling_price) }} x {{ detail.quantity }})</td>
                    <td class="text-right">Rp{{ digitSeparator(Number(detail.product_selling_price) *
                      Number(detail.quantity))
                    }}</td>
                  </tr>
                  <tr>
                    <td>Diskon</td>
                    <td class="text-right">Rp{{ digitSeparator(detail.discount) }}</td>
                  </tr>
                  <tr>
                    <td>Biaya (ongkir dll)</td>
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
          <q-separator dark />
        </q-item>

      </q-list>
    </q-card-section>
  </q-card>
</template>
<script setup>
import digitSeparator from 'src/utils/digit-separator';
import { fullDate } from 'src/utils/format-date';
import { reactive } from 'vue';

const props = defineProps({
  order: { type: Object }
});
const order = reactive(props.order)
</script>
