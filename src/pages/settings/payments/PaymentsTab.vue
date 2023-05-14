<template>
  <q-card flat>
    <q-card-section class="no-padding">
      <q-list separator="" class="bg-green-1">
        <q-item v-for="(payment, index) in payments" :key="index">
          <q-item-section top avatar>
            <q-avatar color="green" text-color="green-12" icon="account_balance_wallet" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ payment.val }}</q-item-label>
            <q-item-label caption lines="2">{{ payment.description }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn icon="edit" round color="green-8" text-color="green-1" @click="crud(false, payment)"></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="bg-green-6">
      <q-btn icon="add" label="Tambah" no-caps="" color="green-10" text-color="green-11" @click="crud(true, {})" />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="showModal">
    <PaymentsCrud :is-new="newPayment" :payment="payment" />
  </q-dialog>

  <!-- <pre>{{ categories }}</pre> -->
</template>
<script setup>
import { apiTokened } from 'src/config/api';
import { reactive, ref } from 'vue';
import PaymentsCrud from './PaymentsCrud.vue';

const showModal = ref(false)
const newPayment = ref(false)

let payment = {}
const crud = (isNew, py = {}) => {
  newPayment.value = isNew
  payment = py
  showModal.value = true
}

const payments = reactive([])
try {
  const response = await apiTokened.get(`lists/payment-method`);
  Object.assign(payments, response.data.data.lists);
} catch (error) {
  console.log("Not Found: Stores -> list", error.response);
}
</script>
