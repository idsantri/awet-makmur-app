<template>
  <div>
    halaman untuk menampilkan data stock berdasarkan toko
  </div>
  <pre>{{ stocks }}</pre>
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import { notifyError } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const stocks = reactive([]);
const params = ref(useRoute().params);
try {
  const response = await apiTokened.get(`stores/${params.value.id}/stocks`);
  Object.assign(stocks, response.data.data.stocks);
  // console.log(product);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}
</script>
