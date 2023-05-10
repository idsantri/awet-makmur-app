<template>
  <q-banner class="bg-teal-4 text-teal-11 q-mb-xs q-pa-sm" inline-actions>
    <h2 class="text-h6 no-margin text-weight-light text-teal-1">
      <slot name="title"></slot>
    </h2>
    <!-- TOMBOL CARI -->
    <template v-slot:action>
      <slot name="buttons"></slot>
    </template>
  </q-banner>
</template>
