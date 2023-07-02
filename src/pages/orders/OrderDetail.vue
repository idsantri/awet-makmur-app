<template>
  <div class="q-pa-sm" style="max-width: 600px;">
    <BannerTitle>
      <template #title>
        <div class="text-h6 text-weight-light">Data Transaksi</div>
        <q-space />
        <div class="text-subtitle1 text-weight-light">{{ order.store_name }} ({{ order.store_address }})
        </div>
        <div class="text-caption">{{ fullDate(order.created_at) }}</div>
      </template>
      <template #buttons>
        <div>
          <q-btn color="green-10" class="block text-green-11 q-mb-sm" icon="description" @click="createInvoice" />
          <q-btn color="green-14" class="block text-white" icon="call" @click="redirectToWA" />
        </div>
      </template>
    </BannerTitle>
    <q-card class="q-mt-sm q-pa-sm">
      <q-card-section class="no-padding">
        <q-markup-table class="text-green-10" flat bordered="">
          <tbody>
            <tr>
              <td>Pelanggan</td>
              <td class="multi-line">{{ order.customer_name }} ({{ order.customer_address }}; {{ order.customer_phone }})
              </td>
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
              <td class="multi-line" style="padding-right: 40px;">{{ order.note }}</td>
            </tr>
          </tbody>
        </q-markup-table>

        <q-btn round dense color="green-10" icon="edit" class="absolute-bottom-right q-mb-xs q-mr-xs"
          @click="showModalOrder = true" />

      </q-card-section>
      <q-card-section class="no-padding q-mt-sm">
        <q-list bordered separator>
          <q-item-label header overline class="q-py-sm">Data Produk</q-item-label>
          <q-item clickable v-ripple v-for="(detail, index) in order.order_detail" :key="index"
            @click="goToProduct(detail.product_id)">
            <q-item-section>
              <q-item-label>{{ detail.product_name }} {{ detail.product_brand ? ' (' + detail.product_brand + ')' : ''
              }}</q-item-label>
              <q-item-label caption>
                <q-markup-table flat dense class="text-green-10">
                  <tbody>
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
      <q-card-actions class="q-mt-sm bg-green-7">
        <q-btn color="negative" label="Hapus" @click="deleteOrder" />
      </q-card-actions>
    </q-card>
  </div>

  <q-dialog v-model="showModalInvoice">
    <OrderInvoice :order="order" />
  </q-dialog>

  <q-dialog v-model="showModalOrder">
    <OrderModal :order="order" />
  </q-dialog>

  <!-- <pre>{{ order.order_detail }}</pre> -->
</template>

<script setup>
import { apiTokened } from 'src/config/api';
import { notifyError, notifySuccess } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fullDate } from 'src/utils/format-date'
import digitSeparator from 'src/utils/digit-separator';
import BannerTitle from 'src/components/BannerTitle.vue';
import html2pdf from "html2pdf.js";
import OrderInvoice from './OrderInvoice.vue';
import slugify from 'src/utils/slugify';
import { useQuasar } from 'quasar';
import getInitials from 'src/utils/initial';
import OrderModal from './OrderModal.vue';

const order = reactive({})
const params = ref(useRoute().params);
const showModalInvoice = ref(false)
const showModalOrder = ref(false)

try {
  const response = await apiTokened.get(`orders/${params.value.id}`);
  Object.assign(order, response.data.data.order);
  // console.log(order);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}

const router = useRouter();
const goToProduct = (id) => {
  if (!id) {
    return notifyError("Produk sudah dihapus!");
  }
  router.push('/products/' + id)
}

const redirectToWA = () => {
  const wa = order.customer_phone.replace(/^0/, '62');
  window.open(`https://wa.me/${wa}`, '_blank');
}

const $q = useQuasar()
const createInvoice = async () => {
  showModalInvoice.value = true;
  // Tunggu beberapa saat agar modalInvoice terlihat sebelum membuat PDF
  await new Promise((resolve) => setTimeout(resolve, 500));
  const targetElement = document.getElementById('invoice');
  const filename = getInitials(order.store_name) + '-' + order.created_at.slice(0, 10) + '-' + slugify(order.customer_name) + '.pdf'
  if (targetElement) {
    const clonedElement = targetElement.cloneNode(true);
    clonedElement.style.overflow = 'linebreak';
    await html2pdf().set({
      margin: [5, 10, 10, 10],
      filename: filename,
      output: 'datauristring',
      jsPDF: {
        format: 'a5',
        orientation: 'landscape',
      },
    }).from(clonedElement).save();
  }
  $q.dialog({
    title: "Konfirmasi",
    message: `Berhasil membuat Nota. Silakan periksa di folder download/unduhan!<br/>Nama file: <strong>${filename}</strong><br/><br/>Buka WhatsApp?`,
    cancel: true,
    persistent: false,
    html: true,
    ok: "Ya",
    cancel: "Tidak"
  }).onOk(async () => {
    redirectToWA()
  })
  showModalInvoice.value = false;
};

const deleteOrder = async () => {
  $q.dialog({
    title: "Konfirmasi",
    message: `<span style="color:'red'">Hapus transaksi ini?</span><br/><br/><hr/><em>Stok akan dikembalikan ke semula!</em><hr/>`,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
    try {
      const response = await apiTokened.delete(`orders/${order.id}`);
      notifySuccess(response.data.message);
      router.go(-1)
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    }
  })
}

</script>
