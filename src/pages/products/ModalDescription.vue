<template>
  <q-card style="width: 700px; max-width: 90vw">
    <q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
      <div class="text-subtitle1">Deskripsi Produk</div>
    </q-card-section>

    <q-card-section class="q-pa-sm bg-green-1 q-gutter-sm">
      <q-editor v-model="textDescription" min-height="5rem" />
    </q-card-section>

    <q-card-actions align="right" class="bg-green-7">
      <q-btn color="green-10" label="Simpan" @click="saveDescription" />
      <q-btn color="secondary" label="Gagal" v-close-popup />
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
