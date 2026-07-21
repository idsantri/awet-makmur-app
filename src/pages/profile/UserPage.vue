<template>
	<q-card class="q-ma-sm text-green-10">
		<q-card-section class="bg-green-8 text-green-1 q-pa-sm">
			<h2 class="text-subtitle1 no-margin">Profil Saya</h2>
		</q-card-section>
		<q-card-section class="q-pa-sm">
			<q-markup-table flat bordered>
				<thead>
					<tr>
						<th class="text-left">Data Pengguna</th>
						<th class="text-right">
							<q-btn
								class="q-px-md"
								color="green-10"
								outline
								no-caps
								icon-right="edit"
								label="Edit"
								@click="showModal = true"
								dense
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Nama Lengkap</td>
						<td>{{ user.name }}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{{ user.email }}</td>
					</tr>
					<tr>
						<td>Username</td>
						<td>{{ user.username }}</td>
					</tr>
					<tr>
						<td>Password</td>
						<td class="flex items-center justify-between">
							<div>*****</div>
							<q-btn
								flat
								class=""
								color="green-10"
								outline
								no-caps
								icon="edit"
								@click="onPassword"
							/>
						</td>
					</tr>
				</tbody>
			</q-markup-table>

			<q-markup-table flat bordered class="q-mt-md">
				<thead>
					<tr>
						<th class="text-left">Info Group</th>
						<th class="text-right"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="group in groups" :key="group.key">
						<td>{{ group.title }}</td>
						<td class="text-right">
							<q-toggle
								v-model="group.value"
								checked-icon="check"
								unchecked-icon="clear"
								color="green-6"
								dense
								disable
							/>
						</td>
					</tr>
				</tbody>
			</q-markup-table>
			<!-- <pre>
				{{ groups }}
			</pre
			> -->
		</q-card-section>
		<q-dialog v-model="showModal">
			<UserForm :user="user" />
		</q-dialog>
	</q-card>
</template>
<script setup>
import Auth from "src/models/Auth";
import { useAuthStore } from "src/stores/auth-store";
import { notifyAlert } from "src/utils/notify";
import { onMounted, ref } from "vue";
import UserForm from "./UserForm.vue";

const useStore = useAuthStore();
const user = ref(useStore.user);
const groups = ref(useStore.groups);
const showModal = ref(false);

async function fetchUserProfile() {
	const response = await Auth.getProfile();
	if (response) {
		user.value = response.data.user;
		useStore.setUser({ user: response.data.user });
		groups.value = response.data.groups;
	}
}

onMounted(() => fetchUserProfile());

const onPassword = () => {
	notifyAlert(
		`
	<p style="text-align: justify; margin:0">Untuk mengganti password</p>
	<ul style="text-align: justify; margin:0; padding-left: 16px">
		<li>Keluar dari Aplikasi</li>
		<li>Pada halaman Login klik lupa password</li>
		<li>Ikuti petunjuk yang diberikan</li>
	</ul>
	`,
		0
	);
};
</script>
<style lang=""></style>
