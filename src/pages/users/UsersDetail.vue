<template>
  <div class="q-ma-sm">
    <BannerTitle>
      <template #title>
        <h2 class="no-margin text-green-11 text-h6 text-weight-light">Data Pengguna</h2>
      </template>
    </BannerTitle>


    <q-card class="my-card q-my-sm">
      <q-card-section class="bg-green-7 text-green-1 q-pa-sm">
        <div class="text-body1 text-bold">{{ user.username }}</div>
        <div class="text-body2">{{ user.email }}</div>
      </q-card-section>
      <!-- <q-card-section class="bg-green-11 q-pa-sm">
        <div class="text-subtitle1">Akses:</div>
        <q-markup-table flat="" class="bg-transparent text-green-10">
          <tbody>
            <tr class="text-weight-medium">
              <td class="no-padding">Group</td>
              <td class="no-padding">Izin</td>
              <td class="no-padding">Tindakan</td>
            </tr>
            <tr v-for="(group, index) in group" :key="index">
              <td class="no-padding">{{ index }}</td>
              <td class="no-padding">
                {{ group == true ? "Ya" : "Tidak" }}
              </td>
              <td class="no-padding">
                <q-btn rounded="" :color="group == true ? 'negative' : 'green'" class="text-green-11 "
                  :icon="group == true ? 'delete' : 'check_circle'" @click="setGroup(index, !group)" />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section> -->

      <q-card-section class="bg-green-11 q-pa-sm">
        <q-list bordered="" separator="" class="bg-green-1">
          <q-item tag="label" v-ripple v-for="(group, index) in groups" :key="index">
            <q-item-section>
              <q-item-label>{{ group.group_name }}</q-item-label>
              <q-item-label caption="">{{ group.group_description }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="green-10" v-model="group.value" true-value="1" false-value="0"
                @click="setGroup(group.group_name, group.value == 1 ? true : false)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions class="bg-green-6">
        <q-btn label="Hapus" color="negative" @click="deleteUser(user.id)" />
      </q-card-actions>
    </q-card>
    <!-- <pre>{{ user }}</pre>
    <pre>{{ groups }}</pre> -->
  </div>
</template>
<script setup>
import { useQuasar } from 'quasar';
import BannerTitle from 'src/components/BannerTitle.vue';
import { apiTokened } from 'src/config/api';
import { forceRerender } from 'src/utils/buttons-click';
import { notifyError, notifySuccess } from 'src/utils/notify';
import toArray from 'src/utils/to-array';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const user = reactive({});
// const group = reactive({});
const groups = reactive([]);
const route = useRoute()
const userId = route.params.id
try {
  const response = await apiTokened.get(`users/${userId}`);
  Object.assign(user, response.data.data.user);
  // Object.assign(group, response.data.data.group);
  Object.assign(groups, response.data.data.groups);
} catch (error) {
  toArray(error.response.data.message).forEach((message) => {
    notifyError(message);
  });
}
const router = useRouter()
const $q = useQuasar();
const setGroup = async (group, method) => {
  let message = null;
  if (method) message = `Tetapkan sebagai <strong>${group}</strong>?`;
  else message = `Hapus dari group <strong>${group}</strong>?`;

  $q.dialog({
    title: "Konfirmasi",
    message: message,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
    try {
      const response = await apiTokened.post(`users/${user.id}/group`, {
        group: group,
        method: method ? 'add' : 'remove'
      });
      notifySuccess(response.data.message);
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    } finally {
      forceRerender()
    }
  }).onCancel(() => {
    forceRerender()
  })
}

const deleteUser = async (id) => {
  $q.dialog({
    title: "Konfirmasi",
    message: `<span style="color:'red'">Hapus User ini?</span>`,
    cancel: true,
    persistent: false,
    html: true,
  }).onOk(async () => {
    try {
      const response = await apiTokened.delete(`users/${id}`);
      notifySuccess(response.data.message);
      router.go(-1)
    } catch (error) {
      toArray(error.response.data.message).forEach((message) => {
        notifyError(message);
      });
    }
  })
}
</script>
