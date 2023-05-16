<template>
  <q-card class="text-black" id="invoice">
    <q-card-section class="no-padding q-ma-md">
      <div class="text-h6">Toko {{ order.store_name }}</div>
      <div class="text-caption q-mb-md"> {{ order.store_address }}</div>
      <q-separator />
      <div class="text-h5 text-center">Contoh INVOICE 2</div>
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
      <q-markup-table flat dense>
        <thead>
          <th>Nama Produk</th>
          <th>Harga</th>
          <th>Qty</th>
          <th>Biaya</th>
          <th>Diskon</th>
          <th>Sub Total</th>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in order.order_detail" :key="index">
            <td>{{ detail.product_name }} {{ detail.product_brand ? ' (' + detail.product_brand + ')' : '' }}</td>
            <td class="text-right">Rp{{ digitSeparator(detail.product_selling_price) }} </td>
            <td class="text-center">{{ (detail.quantity) }} </td>
            <td class="text-right">Rp{{ digitSeparator(detail.cost) }}</td>
            <td class="text-right">Rp{{ digitSeparator(detail.discount) }}</td>
            <td class="text-right text-bold">Rp{{ digitSeparator(detail.price_amount) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-separator />
      <div class="text-italic"> *&rpar; Biaya = ongkos kirim, custom produk, dll</div>
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
