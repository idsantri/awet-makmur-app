<template>
	<q-card style="width: 700px; max-width: 90vw">
		<q-form method="post" @submit.prevent="onSubmit">
			<q-card-section class="bg-green-8 text-green-1 q-pa-sm q-mb-sm">
				<div class="text-subtitle1">Profil Pengguna</div>
			</q-card-section>

			<q-card-section class="q-pa-sm q-gutter-sm bg-green-1">
				<q-input
					outlined
					v-model="user.email"
					label="Email"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
					readonly
					disable
					hint="Email tidak dapat diubah"
				/>
				<q-input
					outlined
					v-model="user.name"
					label="Nama"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
					hint="Nama Anda"
				/>
				<q-input
					outlined
					v-model="user.username"
					label="Username"
					:rules="[(val) => !!val || 'Harus diisi!']"
					error-color="red-6"
					hint="Anda bisa login dengan username atau password"
				/>
			</q-card-section>
			<q-card-actions class="bg-green-7">
				<q-btn v-if="false" color="negative" label="Hapus" />
				<q-space />
				<q-btn color="green-10" label="Simpan" type="submit" no-caps />
				<q-btn color="secondary" label="Gagal" v-close-popup no-caps />
			</q-card-actions>
		</q-form>
	</q-card>
</template>
<script setup>
import { ref, toRefs, reactive, onMounted } from "vue";
import { notifySuccess } from "../../utils/notify";
import { forceRerender } from "../../utils/buttons-click";
import { useRouter } from "vue-router";
import CurrencyInput from "src/components/CurrencyInput.vue";
import Product from "src/models/Product";
import Auth from "src/models/Auth";

const router = useRouter();
const props = defineProps({
	user: { type: Object, required: true },
});
const user = ref(structuredClone(props.user));

const onSubmit = async () => {
	const data = {
		name: user.value.name,
		username: user.value.username,
	};

	const response = await Auth.updateProfile(data);
	if (!response) return;
	notifySuccess(response.message);
	forceRerender();
};
</script>
