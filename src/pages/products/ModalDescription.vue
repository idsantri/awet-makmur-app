<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-card-section>
      <div class="text-h6 text-green-10">Deskripsi Produk</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-editor v-model="textDescription" min-height="5rem" />
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-green">
      <q-btn flat color="green-10" label="Simpan" @click="saveDescription" />
      <q-btn flat color="green-10" label="Gagal" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { ref } from "vue";
import { notifySuccess, notifyError } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { apiTokened } from "../../config/api";
import toArray from "../../utils/to-array";

const props = defineProps({
  productDescription: { type: String, default: "" },
  productId: { type: Number, default: 0 },
});

const textDescription = ref(props.productDescription);
const id = ref(props.productId);
const saveDescription = async () => {
  try {
    const response = await apiTokened.put(`products/${id.value}`, {
      description: textDescription.value,
    });
    // console.log(response);
    notifySuccess(response.data.message);
  } catch (error) {
    // console.log(error);
    toArray(error.response.data.message).forEach((message) => {
      notifyError(message);
    });
  } finally {
    forceRerender();
  }
};
</script>
