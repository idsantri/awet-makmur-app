<template>
  <q-card>
    <q-card-section>
      Rp{{ digitSeparator(props.total) }}
      <q-input v-model.number="numberInput" :before="digitSeparator(numberInput)"
        @input="(val) => { numberInput = digitUnseparator(val); }" />
      <q-input v-model.number="numberInput" :before="digitSeparator(numberInput)"
        @input="(val) => { numberInput = digitUnseparator(val); }" />
    </q-card-section>
    <pre>{{ numberInput }}</pre>
  </q-card>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  total: { type: Number, default: null },
});

const numberInput = ref(0);

const digitSeparator = (value) => {
  if (!value) {
    return '';
  }
  const parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const digitUnseparator = (value) => {
  if (!value) {
    return '';
  }
  return value.toString().replace(/,/g, '');
};
</script>
