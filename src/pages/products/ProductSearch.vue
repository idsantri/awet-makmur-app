<template>
  <q-card style="width: 100%; ">
    <q-card-section class="bg-green-8 text-green-1 q-pa-sm">
      <h2 class="text-subtitle1 no-margin">Cari Produk</h2>
    </q-card-section>
    <q-card-section>
      <Suspense>
        <template #default>
          <data-table class="display table" :options="options" id="data-tables" style="overflow: hidden;">
            <thead>
              <tr>
                <th style="text-align: center;">!</th>
                <th>Nama (Merek)</th>
                <th>Kategori</th>
                <th>Harga Jual</th>
                <th>Stok</th>
              </tr>
            </thead>
          </data-table>
        </template>
        <template #fallback>
          <p>...loading</p>
        </template>
      </Suspense>
    </q-card-section>
    <q-card-actions align="right" class="bg-green-7">
      <q-btn color="secondary" label="Tutup" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-dt";
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiTokened } from '../../config/api'
const router = useRouter()

const url = `${apiTokened.defaults.baseURL}/products/search`
const headers = { Authorization: apiTokened.defaults.headers.common.Authorization }
DataTable.use(DataTablesLib);
const options = ref({
  processing: true,
  serverSide: true,
  responsive: true,
  ajax: {
    url: url,
    type: 'POST',
    headers: headers,
  },
  order: [],
  columnDefs: [
    {
      targets: 0,
      className: 'hidden',
    },
    {
      targets: 1,
      render: function (data, type, row, meta) {
        return `<span class="nama-link" onclick='goTo(${row[0]})'>${row[1]}</span>`
      },
    },
    {
      targets: 3,
      className: 'dt-body-right',
      render: function (data, type, row, meta) {
        function digitSeparator(value) {
          let n;
          if (!isNaN(value)) n = value;
          else n = 0;
          return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        };
        return "Rp" + digitSeparator(data)
      },
    },
    {
      targets: 4,
      className: 'dt-body-center',
    },
  ],
  language: {
    search: 'Cari:',
    zeroRecords: 'Tidak data data untuk ditampilkan. Coba kata kunci yang lain!',
    info: 'Menampilkan _START_ hingga _END_, dari total _TOTAL_ data',
    // info: 'Halaman _PAGE_ dari _PAGES_ halaman',
    infoFiltered: '(disaring dari _MAX_ total data)',
    paginate: { first: '↑', previous: '←', next: '→', last: '↓' },
    lengthMenu: '_MENU_ Perhalaman',
  },
  autoWidth: false,
  // dom: 'bftip',
})

onMounted(() => {
  document.goTo = (id) => {
    router.push(`/products/${id}`)
  };
});

onUnmounted(() => {
  delete document.goTo;
});

</script>
<style lang="scss">
@import "datatables.net-dt";
</style>
