<template>
  <div class="q-mt-md" style="max-width: 600px;">
    <q-form @submit.prevent="submitOrder">
      <q-card class="q-ma-sm text-teal-10">
        <q-card-section class="q-gutter-sm no-margin q-pa-sm">
          <q-select outlined v-model="store_id" :options="listStores" option-value="id" option-label="name" emit-value
            map-options label="Toko" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
          <div class="text-body1 q-mt-md">Data Pelanggan</div>
          <q-input outlined v-model="customer_name" label="Nama" :rules="[val => !!val || 'Harus diisi!']"
            error-color="red-6" />
          <q-input outlined v-model="customer_address" label="Alamat" :rules="[val => !!val || 'Harus diisi!']"
            error-color="red-6" />
          <q-input outlined v-model="customer_phone" label="Telepon" type="number"
            :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
          <q-select outlined v-model="payment" :options="listPayment" option-value="val" option-label="val" emit-value
            map-options label="Pembayaran" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
          <q-input v-model="note" outlined type="textarea" label="Catatan" autogrow placeholder="Catatan transaksi" />

          <div class="text-body1 q-mt-md">Data Produk</div>
          <q-list class="rounded-borders">
            <q-item v-for="(product, index) in products" :key="index" class="no-padding q-mb-lg">
              <q-item-section>
                <q-item-label>
                  <q-markup-table class="text-teal-10" dense flat>
                    <tbody>
                      <tr>
                        <td class="text-left ">
                          <span class="cursor-pointer text-body2 text-weight-bold multi-line">{{ product.name }}
                            ({{ product.code
                            }})</span>
                        </td>
                        <td class="text-right">
                          <q-btn flat dense color="negative" icon="delete" @click="deleteOrder(product.id)" />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Satuan</td>
                        <td class="text-right">@Rp{{ digitSeparator(product.selling_price) }}</td>
                      </tr>
                      <tr>
                        <td class="text-left">Jumlah</td>
                        <td class="text-right">
                          {{ digitSeparator(product.quantity) }}
                          <q-popup-edit v-model="product.quantity" auto-save v-slot="scope">
                            <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                              hint="Jumlah" />
                          </q-popup-edit>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Diskon</td>
                        <td class="text-right">
                          Rp{{ digitSeparator(product.discount) }}
                          <q-popup-edit v-model="product.discount" auto-save v-slot="scope">
                            <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                              hint="diskon" />
                          </q-popup-edit>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Biaya</td>
                        <td class="text-right">
                          Rp{{ digitSeparator(product.cost) }}
                          <q-popup-edit v-model="product.cost" auto-save v-slot="scope">
                            <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                              hint="Biaya" />
                          </q-popup-edit>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-left">Sub Total</td>
                        <td class="text-right text-weight-medium">Rp{{ digitSeparator(product.sub_total) }}</td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="q-py-sm q-px-sm">
          <div class="text-body1 text-right q-pr-md">Total: <span class="text-weight-bold">Rp{{
            digitSeparator(getGrandTotal())
          }}</span></div>
        </q-card-section>
        <q-card-actions align="right" class="bg-teal-2">
          <q-btn type="submit" icon="save" label="Proses" color="teal-6" />
        </q-card-actions>
      </q-card>
    </q-form>
    <!-- <pre>{{ products }}</pre> -->
  </div>
</template>

<script setup>
import ordersStore from 'src/stores/orders-store';
import { reactive, ref } from 'vue'
import { apiTokened } from "../../config/api";
import digitSeparator from 'src/utils/digit-separator';
import toArray from 'src/utils/to-array';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { forceRerender } from 'src/utils/buttons-click';

const listStores = reactive([]);
const listPayment = reactive([]);
const customer_name = ref('')
const customer_address = ref('')
const customer_phone = ref('')
const note = ref('')
const store_id = ref(null)
const payment = ref('')

try {
  const response = await apiTokened.get(`lists/payment-method`);
  Object.assign(listPayment, response.data.data.lists);
} catch (error) {
  console.log("Not Found: list -> payment", error.response);
}

const products = reactive(ordersStore().getOrders)
const grandTotal = ref(0)
const getGrandTotal = () => {
  let total = 0;
  products.forEach(function (item) {
    total += item.sub_total;
  });
  return grandTotal.value = total
}

try {
  const response = await apiTokened.get(`stores`);
  Object.assign(listStores, response.data.data.stores);
} catch (error) {
  console.log("Not Found: stores -> list", error.response);
}

const deleteOrder = (id) => {
  ordersStore().removeOrder(id)
}

const submitOrder = async () => {

  const products_order = JSON.parse(JSON.stringify(products)).map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    discount: item.discount,
    cost: item.discount
  }))

  const data = {
    store_id: store_id.value,
    customer_name: customer_name.value,
    customer_address: customer_address.value,
    customer_phone: customer_phone.value,
    payment: payment.value,
    note: note.value,
    products: products_order
  }

  try {
    const response = await apiTokened.post(`orders`, data);
    console.log(response);
    notifySuccess(response.data.message);
    ordersStore().clearOrders()
    forceRerender()
  } catch (error) {
    // console.log(error);
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  }
}

</script>

<style lang="scss" scoped>
.multi-line {
  white-space: pre-wrap;
  word-wrap: break-word;
}</style>
