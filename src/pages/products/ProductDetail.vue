<template>
  <q-card class="q-ma-sm">
    <q-card-section class="no-padding">
      <div v-if="product.image_last">
        <q-img style="height: 30vh" :src="product.image_url + product.image_last">
          <q-btn push round color="teal" icon="edit" class="absolute all-pointer-events" style="bottom: 8px; right: 8px"
            @click="showUploader = true" />
        </q-img>
      </div>
      <div v-else>
        <q-img style="max-height: 30vh" src="https://picsum.photos/400/300.webp">
          <q-btn push round color="teal" icon="edit" class="absolute all-pointer-events" style="bottom: 8px; right: 8px"
            @click="showUploader = true" />
        </q-img>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-caption">
        {{ product.category_name }} / {{ product.code }} /
        {{ product.total_stock ? product.total_stock : 0 }}
        item
      </div>
      <div class="row">
        <div class="text-h6">{{ product.name }}</div>
        <q-space />
        <q-btn color="teal-10" flat icon-right="add_shopping_cart" label="Order" @click="addToCart" />
      </div>
      <div class="text-subtitle2">
        Rp{{ digitSeparator(product.selling_price) }}
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="row items-center">
        <div class="text-body1">Deskripsi:</div>
        <q-space />
        <q-btn color="teal-10" flat icon-right="edit" label="Edit" @click="showModalDescription = true" />
      </div>
      <span class="text-teal-10 text-caption" v-html="product.description"></span>
    </q-card-section>
    <q-card-section class="q-pt-none data">
      <q-markup-table class="text-teal-10">
        <thead>
          <tr class="bg-teal-1">
            <th class="text-left">
              <div class="text-body1">Data Produk</div>
            </th>
            <th class="text-right">
              <q-btn color="teal-10" flat icon-right="edit" label="Edit" @click="showModalProduct = true" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Kode</td>
            <td class="text-left">{{ product.code }}</td>
          </tr>
          <tr>
            <td class="text-left">Nama</td>
            <td class="text-left multi-line">{{ product.name.toUpperCase() }}</td>
          </tr>
          <tr>
            <td class="text-left">Merek</td>
            <td class="text-left">{{ product.brand }}</td>
          </tr>
          <tr>
            <td class="text-left">Pemasok</td>
            <td class="text-left">{{ product.supplier }}</td>
          </tr>
          <tr>
            <td class="text-left">Kategori</td>
            <td class="text-left">{{ product.category_name }}</td>
          </tr>
          <tr>
            <td class="text-left">Harga Dasar</td>
            <td class="text-right">
              Rp{{ digitSeparator(product.base_price) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Harga Jual</td>
            <td class="text-right">
              Rp{{ digitSeparator(product.selling_price) }}
            </td>
          </tr>
          <tr>
            <td class="text-left">Keuntungan</td>
            <td class="text-right">Rp{{ digitSeparator(margin) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-markup-table class="text-teal-10 q-mt-md">
        <thead>
          <tr class="bg-teal-1">
            <th class="text-left">
              <div class="text-body1">Stock</div>
            </th>
            <th colspan="2" class="text-right">
              <q-btn color="teal-10" flat icon-right="edit" label="Edit" @click="showModalStock = true" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in stocks" :key="index">
            <td class="text-left">{{ stock.store_name }}</td>
            <td class="text-left">{{ stock.stock }}</td>
            <td class="text-right">
              <q-btn icon="delete" label="Hapus" color="red" flat @click="deleteStock(stock.id)" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>

  <q-dialog v-model="showModalDescription">
    <modal-description :product-description="product.description" :product-id="parseInt(product.id)" />
  </q-dialog>

  <q-dialog v-model="showModalStock">
    <modal-stock :product-id="parseInt(product.id)" />
  </q-dialog>

  <q-dialog v-model="showModalProduct">
    <modal-product :is-new="false" :product="product" />
  </q-dialog>

  <my-upload field="image" langType="en" :langExt="translate" no-circle @crop-success="cropSuccess"
    @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="showUploader" :width="500"
    :height="500" :url="urlUpload" :params="paramsImage" :headers="headers" withCredentials img-format="png"></my-upload>
  <!-- <img :src="imgDataUrl"> -->

  <div class="flex fixed-bottom-right q-mr-md q-mb-xl q-gutter-md">
    <q-btn push color="teal" round icon="search" @click="showModalSearch = true" />
  </div>

  <q-dialog v-model="showModalSearch">
    <ModalSearch />
  </q-dialog>
</template>

<script setup>
import digitSeparator from "../../utils/digit-separator";
import { apiTokened } from "../../config/api";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import toArray from "../../utils/to-array";
import ModalDescription from "./ModalDescription.vue";
import ModalProduct from "./ModalProduct.vue";
import ModalStock from "./ModalStock.vue";
import { notifyError, notifySuccess } from "src/utils/notify";
import { forceRerender } from "src/utils/buttons-click";
import myUpload from "vue-image-crop-upload";
import ordersStore from "src/stores/orders-store";
import ModalSearch from "./ProductSearch.vue";

const route = useRoute();
const params = ref(route.params);
const product = reactive({});
const stocks = reactive([]);
const images = reactive([]);
const margin = ref(0);
const showModalDescription = ref(false);
const showModalProduct = ref(false);
const showModalStock = ref(false);
const showModalSearch = ref(false);

const deleteStock = async (id) => {
  const isConfirmed = true
  if (isConfirmed) {
    try {
      const response = await apiTokened.delete(`stocks/${id}`);
      notifySuccess(response.data.message);
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    } finally {
      forceRerender();
    }
  }
}

const addToCart = () => {
  ordersStore().addOrder(product)
}

const translate = {
  hint: "Klik atau tarik file gambar ke sini untuk upload",
  loading: "Uploading…",
  noSupported: "Browser is not supported, please use IE10+ or other browsers",
  success: "Upload berhasil",
  fail: "Upload gagal",
  preview: "Preview",
  btn: {
    off: "Gagal",
    close: "Tutup",
    back: "Kembali",
    save: "Simpan",
  },
  error: {
    onlyImg: "Hanya gambar",
    outOfSize: "Gambar melebihi batas ukuran: ",
    lowestPx: "Ukuran gambar terlalu rendah. Setidaknya diharapkan: ",
  },
};
const showUploader = ref(false);
const imgDataUrl = ref("");
const urlUpload = `http://localhost:8080/products/${params.value.id}/image`;
const headers = {};
const paramsImage = {};
const cropSuccess = (imgData, field) => {
  imgDataUrl.value = imgData;
  console.log(imgData);
  console.log(field);
};

const cropUploadSuccess = (jsonData, field) => {
  // console.log(jsonData);
  // console.log('field: ' + field);
  notifySuccess(jsonData.message);
  forceRerender();
};

/**
 * upload fail
 *
 * [param] status    server api return error status, like 500
 * [param] field
 */
const cropUploadFail = (status, field) => {
  console.log(status);
  console.log("field: " + field);
};

try {
  const response = await apiTokened.get(`products/${params.value.id}`);
  Object.assign(product, response.data.data.product);
  Object.assign(stocks, response.data.data.stocks);
  Object.assign(images, response.data.data.images);
  // console.log(product);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}
margin.value = product.selling_price - product.base_price;
</script>
<style lang="scss" scoped>
.data {
  max-width: 500px;
}

.multi-line {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
