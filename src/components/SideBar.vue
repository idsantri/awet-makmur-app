<template>
  <q-list class="text-teal-1">

    <!-- KATEGORI -->
    <q-item-label header class="text-teal-10 q-pb-none">
      <div class="text-body1 text-teal-1">Produk</div>
      <div class="text-caption">Berdasarkan kategori</div>
    </q-item-label>
    <q-item clickable v-ripple v-for="(category, index) in categoryList" :key="index" :to="category.link">
      <q-item-section avatar>
        <q-icon color="teal-1" :name="category.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ category.name }}</q-item-label>
        <q-item-label caption>{{ category.caption }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator dark />
    <div v-for="(store, index) in storeList" :key="index">
      <q-expansion-item expand-separator :label="'Toko ' + store.name" :caption="store.caption"
        header-class="text-body1 text-teal-1">

        <!-- STOCK -->
        <q-item clickable :to="store.stock.link">
          <q-item-section avatar>
            <q-icon color="teal-1" :name="store.stock.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ store.stock.name }}</q-item-label>
            <q-item-label caption>{{ store.stock.caption }}</q-item-label>
          </q-item-section>
        </q-item>

        <!-- ORDERS -->
        <q-item clickable :to="store.order.link">
          <q-item-section avatar>
            <q-icon color="teal-1" :name="store.order.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ store.order.name }}</q-item-label>
            <q-item-label caption>{{ store.order.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </div>

    <!-- SETTING -->
    <q-item-label header class="text-teal-10 q-pb-none">
      <div class="text-body1 text-teal-1">Setting</div>
      <div class="text-caption">Pengaturan</div>
    </q-item-label>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="teal-1" name="settings" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Pengaturan</q-item-label>
        <q-item-label caption>Pengaturan Aplikasi</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { apiTokened } from 'src/config/api';
import { reactive } from 'vue';

const storeList = reactive([])
const categoryList = reactive([])
try {
  const responseStore = await apiTokened.get(`stores`);
  responseStore.data.data.stores.forEach((store) => {
    storeList.push({
      name: store.name,
      caption: store.address,
      icon: "store",
      // link: `stores/${store.id}/stocks`
      stock: {
        name: "Stok",
        caption: "Data Stok",
        icon: "inventory",
        link: `/stores/${store.id}/stocks`
      },
      order: {
        name: "Order",
        caption: "Daftar Pesanan",
        icon: "local_mall",
        link: `/stores/${store.id}/orders`
      },
    })
  })

  const responseCategory = await apiTokened.get(`categories`);
  responseCategory.data.data.categories.forEach((category) => {
    categoryList.push({
      name: category.name,
      caption: category.description,
      icon: category.icon,
      link: `/products/categories/${category.slug}`,
    })
  })

} catch (error) {
  console.log("Not Found: store -> list", error.response);
}
</script>
