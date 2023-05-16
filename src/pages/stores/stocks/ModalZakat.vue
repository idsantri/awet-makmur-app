<template>
  <q-card class="text-green-10" style="width: 600px; max-width: 90vh;">
    <q-card-section class="bg-green-8 text-green-11 q-pa-sm">
      <div class="text-subtitle1">Hitung Zakat</div>
      <div class="text-overline">
        <slot name="store"></slot>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-sm">
      <q-markup-table flat bordered="" class="text-green-10">
        <tbody>
          <tr>
            <td>1</td>
            <td>Total Aset</td>
            <td class="text-right">Rp{{ digitSeparator(asset) }}</td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Kas Tunai</td>
            <td class="text-right">
              Rp{{ digitSeparator(cash) }}
              <q-popup-edit v-model.number="cash" buttons v-slot="scope">
                <q-input v-model.number="scope.value" type="number" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </td>
            <td><q-icon name="edit" /></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Saldo Bank</td>
            <td class="text-right">
              Rp{{ digitSeparator(bank) }}
              <q-popup-edit v-model.number="bank" buttons v-slot="scope">
                <q-input v-model.number="scope.value" type="number" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </td>
            <td><q-icon name="edit" /></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Piutang Lancar</td>
            <td class="text-right">
              Rp{{ digitSeparator(credit) }}
              <q-popup-edit v-model.number="credit" buttons v-slot="scope">
                <q-input v-model.number="scope.value" type="number" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </td>
            <td><q-icon name="edit" /></td>
          </tr>
          <tr>
            <td>5</td>
            <td>Hutang (-)</td>
            <td class="text-right">
              Rp{{ digitSeparator(debt) }}
              <q-popup-edit v-model.number="debt" buttons v-slot="scope">
                <q-input v-model.number="scope.value" type="number" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </td>
            <td><q-icon name="edit" /></td>
          </tr>
          <tr class="bg-green-1">
            <td></td>
            <td class="text-italic">Total</td>
            <td class="text-right text-bold">Rp{{ digitSeparator(total) }}</td>
            <td></td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
    <q-card-section v-show="zakat > 0" class="q-pa-sm">
      <q-list bordered separator>
        <q-item>
          <q-item-section>
            <q-item-label overline>Total Kekayaan</q-item-label>
            <q-item-label class="text-subtitle1">Rp{{ digitSeparator(total) }}</q-item-label>
            <q-item-label caption>Seluruh data dikurangi hutang</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label overline>Zakat yang Harus Dikeluarkan</q-item-label>
            <q-item-label class="text-subtitle1">Rp{{ digitSeparator(zakat) }}</q-item-label>
            <q-item-label caption>Total kekayaan dikalikan 2,5%</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-actions class="bg-green-7">
      <q-btn icon="calculate" label="Hitung" color="green-10" class="text-green-11" @click="calculateZakat" />
      <q-space />
      <q-btn label="Tutup" color="secondary" class="text-green-1" @click="$emit('close-modal', true)" />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import digitSeparator from 'src/utils/digit-separator';
import { ref, computed } from 'vue';

const props = defineProps({
  asset: { type: Number, default: null },
});

const asset = ref(props.asset)
const cash = ref(0)
const bank = ref(0)
const credit = ref(0)
const debt = ref(0)
const total = computed(() => {
  return Number(asset.value) +
    Number(cash.value) +
    Number(bank.value) +
    Number(credit.value) -
    Number(debt.value);
})
const zakat = ref(0)
const calculateZakat = () => {
  zakat.value = total.value * 2.5 / 100
}
</script>
