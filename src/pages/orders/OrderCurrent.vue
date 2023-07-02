<template>
  <div class="q-pa-sm" style="max-width: 600px;">
    <BannerTitle>
      <template #title>
        <div class="text-h6 text-weight-light">Selesaikan Transaksi</div>
        <div class="text-subtitle1 text-italic">(Buat Nota)</div>
      </template>
    </BannerTitle>
    <div v-if="products.length == 0">
      <q-banner class="bg-red-2 text-red-10 q-mt-sm">
        <div class="text-body1 text-center">Tidak ada data untuk ditampilkan.</div>
        <div class="text-body1 text-center"> Silakan isi keranjang terlebih dahulu!</div>
      </q-banner>
    </div>
    <div v-else>
      <q-form @submit.prevent="submitOrder">
        <q-card class="q-mt-sm">
          <q-card-section class="q-gutter-sm q-pa-sm q-mt-sm">
            <q-select outlined v-model="store_id" :options="listStores" option-value="id" option-label="name" emit-value
              map-options label="Toko" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
            <div class="text-subtitle1 q-mt-md">Data Pelanggan</div>
            <q-input outlined v-model="customer_name" label="Nama" :rules="[val => !!val || 'Harus diisi!']"
              error-color="red-6" />
            <q-input outlined v-model="customer_address" label="Alamat" :rules="[val => !!val || 'Harus diisi!']"
              error-color="red-6" />
            <q-input outlined v-model="customer_phone" label="Telepon" type="number"
              :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
            <q-select outlined v-model="payment" :options="listPayment" option-value="val" option-label="val" emit-value
              map-options label="Pembayaran" :rules="[val => !!val || 'Harus diisi!']" error-color="red-6" />
            <q-input v-model="note" outlined type="textarea" label="Catatan" autogrow placeholder="Catatan transaksi" />

            <div class="text-subtitle1 q-mt-md">Data Produk</div>
            <q-list class="rounded-borders q-mx-sm">
              <q-item v-for="(product, index) in products" :key="index" class="no-padding q-mb-lg">
                <q-item-section>
                  <q-item-label>
                    <q-markup-table class="text-green-10">
                      <tbody>
                        <tr>
                          <td class="text-left cursor-pointer" @click="$router.push('/products/' + product.id)">
                            <span class=" text-body2 text-weight-bold multi-line">{{ product.name }}
                              ({{ product.brand
                              }})</span>
                            <span class="text-italic">
                              ~Stok:
                              {{ product.total_stock }}
                            </span>
                          </td>
                          <td class="text-right" colspan="2">
                            <q-btn flat dense color="negative" label="Hapus" no-caps icon="delete"
                              @click="deleteOrder(product.id)" />
                          </td>
                        </tr>

                        <tr>
                          <td class="text-left">Satuan</td>
                          <td class="text-right">@Rp{{ digitSeparator(product.selling_price) }}</td>
                          <td class="text-right"></td>
                        </tr>
                        <tr>
                          <td class="text-left">Jumlah</td>
                          <td class="text-right">
                            {{ digitSeparator(product.quantity) }}
                            <q-popup-edit v-model="product.quantity" buttons v-slot="scope" :validate="val => val > 0">
                              <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                                hint="Jumlah" :rules="[val => scope.validate(val) || 'Jangan 0']" counter />
                            </q-popup-edit>
                          </td>
                          <td class="text-right"><q-icon name="edit" /> </td>
                        </tr>
                        <tr>
                          <td class="text-left">Diskon</td>
                          <td class="text-right">
                            Rp{{ digitSeparator(product.discount) }}
                            <q-popup-edit v-model="product.discount" buttons v-slot="scope">
                              <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                                hint="diskon" counter />
                            </q-popup-edit>
                          </td>
                          <td class="text-right"><q-icon name="edit" /> </td>
                        </tr>
                        <tr>
                          <td class="text-left">Biaya (ongkir dll)</td>
                          <td class="text-right">
                            Rp{{ digitSeparator(product.cost) }}
                            <q-popup-edit v-model="product.cost" buttons v-slot="scope">
                              <q-input type="number" v-model="scope.value" dense autofocus @keyup.enter="scope.set"
                                hint="Biaya tambahan" counter />
                            </q-popup-edit>
                          </td>
                          <td class="text-right"><q-icon name="edit" />
                          </td>
                        </tr>
                        <tr>
                          <td class="text-left">Sub Total</td>
                          <td class="text-right text-weight-medium">Rp{{ digitSeparator(product.sub_total) }}</td>
                          <td class="text-right"></td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section class="q-py-sm q-px-sm bg-green-11">
            <div class="text-body1 text-right q-mr-sm">Total: <span class="text-weight-bold">Rp{{
              digitSeparator(getGrandTotal())
            }}</span></div>
          </q-card-section>
          <q-card-actions align="right" class="bg-green-7">
            <q-btn type="submit" icon="save" label="Proses" color="green-10" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
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
import BannerTitle from 'src/components/BannerTitle.vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const listStores = reactive([]);
const listPayment = reactive([]);
const customer_name = ref('')
const customer_address = ref('')
const customer_phone = ref('')
const note = ref('')
const store_id = ref(null)
const payment = ref('')
const router = useRouter()

try {
  const responsePayment = await apiTokened.get(`lists/payment-method`);
  Object.assign(listPayment, responsePayment.data.data.lists);
  const responseStore = await apiTokened.get(`stores`);
  Object.assign(listStores, responseStore.data.data.stores);
} catch (error) {
  console.log("Not Found: list ", error.response);
}

const products = reactive(ordersStore().getOrders)
// console.log('p', products);
const grandTotal = ref(0)
const getGrandTotal = () => {
  let total = 0;
  products.forEach(function (item) {
    total += item.sub_total;
  });
  return grandTotal.value = total
}



const $q = useQuasar();
const deleteOrder = (id) => {
  $q.dialog({
    title: "Konfirmasi",
    message: `<span style="color:'red'">Hapus produk dari nota?</span>`,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
    ordersStore().removeOrder(id)
  })
}

const submitOrder = async () => {
  const products_order = JSON.parse(JSON.stringify(products)).map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    discount: item.discount,
    cost: item.cost
  }))

  const data = {
    store_id: store_id.value,
    customer_name: customer_name.value.trim(),
    customer_address: customer_address.value.trim(),
    customer_phone: customer_phone.value.trim(),
    payment: payment.value,
    note: note.value,
    products: products_order
  }

  try {
    const response = await apiTokened.post(`orders`, data);
    // console.log(response.data.data.order.id);
    notifySuccess(response.data.message);
    ordersStore().clearOrders()
    router.push(`/orders/${response.data.data.order.id}`)
  } catch (error) {
    // console.log(error.response.data.message);
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  }
}

</script>
