<template>
  <div class="q-mt-md">
    <q-form>
      <q-card class="q-ma-sm text-teal-10">
        <q-card-section class="q-gutter-sm">
          <q-select outlined v-model="store_id" :options="listStores" option-value="id" option-label="name" label="Toko"
            emit-value map-options />
          <div class="text-body1 q-mt-md">Data Pelanggan</div>
          <q-input outlined v-model="customer_name" label="Nama" />
          <q-input outlined v-model="customer_address" label="Alamat" />
          <q-input outlined v-model="customer_phone" label="Telepon" type="number" />
          <q-select outlined v-model="payment" :options="['Tunai', 'Transfer BNI']" label="Pembayaran" />
          <q-input v-model="note" outlined type="textarea" label="Catatan" autogrow placeholder="Catatan transaksi" />

          <div class="text-body1 q-mt-md">Data Produk</div>
          <q-list bordered separator class="rounded-borders">
            <q-item v-for="(product, index) in products" :key="index">
              <q-item-section>
                <q-item-label class="q-mt-xs text-body2 text-weight-bold text-teal-10 text-uppercase">
                  <span class="cursor-pointer">{{ product.name }} ({{ product.code }})</span>
                </q-item-label>
                <q-item-label>
                  <span class="text-weight-medium text-teal-8">Rp{{ digitSeparator(product.selling_price) }}</span>
                </q-item-label>
                <q-item-label caption>
                  @rstoenescu in #3: > Generic type parameter for props
                  @rstoenescu in #3: > Generic type parameter for props
                  @rstoenescu in #3: > Generic type parameter for props
                  @rstoenescu in #3: > Generic type parameter for props
                </q-item-label>
              </q-item-section>

              <q-item-section top side style="width: 80px;">
                <q-btn color="negative" flat dense round no-caps icon="delete" label="Biaya" />
                <q-btn color="negative" flat dense round no-caps icon="delete" label="Diskon" />
                <q-btn color="negative" flat dense round no-caps icon="delete" label="Hapus" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-form>
    <pre>{{ products }}</pre>
  </div>
</template>

<script setup>
import ordersStore from 'src/stores/orders-store';
import { reactive, ref } from 'vue'
import { apiTokened } from "../../config/api";
import digitSeparator from 'src/utils/digit-separator';

const listStores = reactive([]);
const customer_name = ref('')
const customer_address = ref('')
const customer_phone = ref('')
const note = ref('')
const store_id = ref(null)
const payment = ref('')

const products = reactive([])
Object.assign(products, ordersStore().getOrders)
products.forEach((product) => {
  product.discount = 0;
  product.cost = 0;
  product.quantity = 1;
});

try {
  const response = await apiTokened.get(`stores`);
  Object.assign(listStores, response.data.data.stores);
} catch (error) {
  console.log("Not Found: stores -> list", error.response);
}
</script>
