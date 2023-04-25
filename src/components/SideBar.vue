<template>
  <q-list class="text-teal-1">

    <!-- KATEGORI -->
    <q-item-label header class="text-teal-10 q-pb-none">
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

    <!-- STOCK BY STORE -->
    <q-separator dark />
    <q-item-label header class="text-teal-10 q-pb-none">
      <div class="text-body1">Stok</div>
    </q-item-label>
    <q-item clickable v-ripple v-for="(stock, index) in stocks" :key="index" :to="stock.link">
      <q-item-section avatar>
        <q-icon color="teal-1" :name="stock.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ stock.name }}</q-item-label>
        <q-item-label caption>{{ stock.caption }}</q-item-label>
      </q-item-section>
    </q-item>

    <!-- TRANSAKSI BY STORE -->
    <!-- <q-separator dark />
    <q-item-label header class="text-teal-10 q-pb-none">
      <div class="text-body1">Transaksi</div>
    </q-item-label>
    <q-item clickable v-ripple v-for="(order, index) in orders" :key="index" :to="order.link">
      <q-item-section avatar>
        <q-icon color="teal-1" :name="order.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ order.name }}</q-item-label>
        <q-item-label caption>{{ order.caption }}</q-item-label>
      </q-item-section>
    </q-item> -->


    <!-- FITUR -->
    <q-separator dark />
    <q-item-label header class="text-teal-10 q-pb-none">
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

    <!-- SETTING -->
    <!-- bla bla -->
    <!-- bla bla -->
    <!-- bla bla -->
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

const orders = [
  {
    name: "Toko 1",
    caption: "Sarbunten",
    icon: "store",
    link: "/stores/1/orders",
  },
  {
    name: "Toko 2",
    caption: "Lajing",
    icon: "store",
    link: "/stores/2/orders",
  },
];

const stocks = [
  {
    name: "Toko 1",
    caption: "Sarbunten",
    icon: "store",
    link: "/stores/1/stocks",
  },
  {
    name: "Toko 2",
    caption: "Lajing",
    icon: "store",
    link: "/stores/2/stocks",
  },
];
</script>
