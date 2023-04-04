<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Toko Awet Makmur
        </q-toolbar-title>

        <div>...</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-teal-5">
      <side-bar />
    </q-drawer>

    <q-page-container>

      <suspense>
        <template #default>
          <router-view :key="$route.fullPath" />
        </template>
        <template #fallback>
          <div class="spinner">
            <q-spinner-cube color="teal-8" size="8em" />
          </div>
        </template>
      </suspense>


    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import SideBar from 'src/components/SideBar.vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value

</script>
