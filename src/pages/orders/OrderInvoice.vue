<template>
  <q-card class="text-black" id="invoice">
    <q-card-section class="no-padding q-ma-md">
      <div class="row justify-between">
        <div class="col-1">
          <q-img src="../../assets/icon-s.png" width="100%" />
        </div>
        <div class="col-7 q-px-sm">
          <div class="text-h6">Toko {{ order.store_name }}</div>
          <div class="text-caption multi-line"> {{ order.store_address_full }} </div>
        </div>
        <div class="col-4">
          <div class="text-h5 text-right">INVOICE</div>
          <div class="text-caption text-right">{{ fullDate(order.created_at) }} </div>
        </div>
      </div>
      <q-separator />
    </q-card-section>
    <q-card-section class="no-padding q-ma-md">
      <div class="row justify-between">
        <div class="col-6 q-pr-xs">
          <div class="text-caption text-italic">Nama:</div>
          <div class="text-body2 text-capitalize">{{ order.customer_name }}</div>
          <div class="text-caption text-italic q-mt-sm">Alamat Pengiriman:</div>
          <div class="text-body2 multi-line">{{ order.customer_address }}</div>
        </div>
        <div class="col-6 q-pl-xs">
          <div class="text-caption text-italic">Total:</div>
          <div class="text-body2 text-bold">Rp{{ digitSeparator(order.sum_selling_price) }}</div>
          <div class="text-caption text-italic q-mt-sm">Catatan:</div>
          <div class="text-body2 multi-line">{{ order.note }} </div>
        </div>
      </div>
      <q-separator />
    </q-card-section>
    <q-card-section class="no-padding q-ma-md">
      <q-markup-table flat dense>
        <thead>
          <th>Nama Produk</th>
          <th>Harga</th>
          <th>Qty</th>
          <th>Biaya*</th>
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
      <div class="text-italic text-caption"> *&rpar; Biaya = ongkos kirim, custom produk, dll</div>
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
