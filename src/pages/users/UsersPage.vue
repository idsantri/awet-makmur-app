<template>
	<div class="q-ma-sm">
		<BannerTitle>
			<template #title>
				<h2 class="no-margin text-green-11 text-h6 text-weight-light">
					Daftar Pengguna
				</h2>
			</template>
		</BannerTitle>

		<div v-if="!users.length > 0">
			<q-banner class="bg-red-2 text-red-10 q-mt-sm">
				<div class="text-body1 text-center">
					Tidak ada data untuk ditampilkan!
				</div>
			</q-banner>
		</div>
		<q-card v-else class="my-card q-my-sm">
			<q-card-section class="q-pa-sm bg-green-11">
				<q-list bordered separator class="bg-green-1">
					<q-item
						clickable
						v-ripple
						v-for="(user, index) in users"
						:key="index"
						:to="'/settings/users/' + user.id"
					>
						<q-item-section>
							<q-item-label overline>{{
								user.name
							}}</q-item-label>
							<q-item-label>
								{{ user.email }} ({{ user.username }})
							</q-item-label>
							<q-item-label caption class="text-italic">
								Akses:
								<span v-if="!user.groups?.length">-</span>
								<span v-else>
									{{
										user.groups
											.map((group) => group.title)
											.join(", ")
									}}
								</span>
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>
		</q-card>
		<InnerLoading :loading="loading" />
		<!-- <pre>{{ users }}</pre> -->
	</div>
</template>
<script setup>
import BannerTitle from "src/components/BannerTitle.vue";
import InnerLoading from "src/components/InnerLoading.vue";
import User from "src/models/User";
import { onMounted, reactive, ref } from "vue";

const users = reactive([]);
const loading = ref(false);
async function fetchUsers() {
	try {
		loading.value = true;
		const response = await User.getAll();
		if (response) {
			Object.assign(users, response.data.users);
		}
	} finally {
		loading.value = false;
	}
}
onMounted(async () => await fetchUsers());
</script>
