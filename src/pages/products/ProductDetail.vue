<template>
  <pre>{{ product }}</pre>
</template>

<script setup>
import { apiTokened } from "../../config/api";
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const params = ref(route.params)
const product = reactive({})
try {
  const response = await apiTokened.get(`products/${params.value.id}`);
  Object.assign(product, response.data.data.product);

} catch (error) {
  console.log("Not Found: product -> list", error.response);
}

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
</style>
