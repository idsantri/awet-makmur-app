<template>
  <q-banner class="bg-teal-4 text-teal-11 q-mb-xs" inline-actions>
    <h2 class="text-h6 no-margin text-weight-light">
      <slot name="title"></slot>
    </h2>
    <!-- TOMBOL CARI -->
    <template v-slot:action>
      <slot name="buttons"></slot>
    </template>
  </q-banner>
</template>
