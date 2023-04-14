<template>
  <q-list class="text-teal-1">

    <q-item-label header class="text-teal-10">
      <div class="text-body1">Kategori Produk</div>
    </q-item-label>

    <q-item clickable v-ripple v-for="(category, index) in categories" :key="index" :to="category.link">
      <q-item-section avatar>
        <q-icon color="teal-1" :name="category.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ category.name }}</q-item-label>
        <q-item-label caption>{{ category.caption }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator dark />
    <q-item-label header class="text-teal-10">
      <div class="text-body1">Transaksi</div>
    </q-item-label>

    <q-item clickable v-ripple v-for="(store, index) in stores" :key="index" :to="store.link">
      <q-item-section avatar>
        <q-icon color="teal-1" :name="store.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ store.name }}</q-item-label>
        <q-item-label caption>{{ store.caption }}</q-item-label>
      </q-item-section>
    </q-item>


    <q-separator dark />
    <q-item-label header class="text-teal-10">
      <div class="text-body1">Fitur</div>
    </q-item-label>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon color="teal-1" name="card_giftcard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Zakat</q-item-label>
        <q-item-label caption></q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script setup>
const categories = [
  {
    name: "Kursi",
    caption: "",
    icon: "chair",
    link: "/products/categories/kursi",
  },
  {
    name: "Tempat Tidur",
    caption: "",
    icon: "king_bed",
    link: "/products/categories/kasur",
  },
  {
    name: "Lemari",
    caption: "",
    icon: "inventory_2",
    link: "/products/categories/lemari",
  },
];

const stores = [
  {
    name: "Toko 1",
    caption: "",
    icon: "store",
    link: "/orders/stores/1",
  },
  {
    name: "Toko 2",
    caption: "",
    icon: "store",
    link: "/orders/stores/2",
  },
];
</script>
