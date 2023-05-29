<template>
  <div class="q-ma-sm">
    <BannerTitle>
      <template #title>
        <h2 class="no-margin text-green-11 text-h6 text-weight-light">Daftar Pengguna</h2>
      </template>
    </BannerTitle>

    <div v-if="!users.length > 0">
      <q-banner class="bg-red-2 text-red-10 q-mt-sm">
        <div class="text-body1 text-center">Tidak ada data untuk ditampilkan!</div>
      </q-banner>
    </div>
    <q-card v-else class="my-card q-my-sm">
      <q-card-section class="q-pa-sm bg-green-11">
        <q-list bordered separator class="bg-green-1">
          <q-item clickable v-ripple v-for="(user, index) in users" :key="index" :to="'/settings/users/' + user.id">
            <q-item-section>
              <q-item-label overline>{{ user.username }}</q-item-label>
              <q-item-label>{{ user.email }}</q-item-label>
              <q-item-label caption class="text-italic">Akses:
                {{
                  Object.keys(user.group)
                    .filter(key => user.group[key])
                    .join(', ') || '-'
                }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <!-- <pre>{{ users }}</pre> -->
  </div>
</template>
<script setup>
import BannerTitle from "src/components/BannerTitle.vue";
import { apiTokened } from "src/config/api";
import { notifyError } from "src/utils/notify";
import toArray from "src/utils/to-array";
import { reactive } from "vue";

const users = reactive([]);

try {
  const response = await apiTokened.get(`users`);
  Object.assign(users, response.data.data.users);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}

</script>
