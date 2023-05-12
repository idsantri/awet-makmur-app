<template>
  <q-banner class="bg-green-8 text-green-11 q-mb-xs q-pa-sm" inline-actions>
    <h2 class="text-h6 no-margin text-weight-light text-green-11">
      <slot name="title"></slot>
    </h2>
    <!-- TOMBOL CARI -->
    <template v-slot:action>
      <slot name="buttons"></slot>
    </template>
  </q-banner>
</template>
