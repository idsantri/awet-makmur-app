<template>
	<div class="q-ma-sm">
		<BannerTitle>
			<template #title>
				<h2 class="no-margin text-green-11 text-h6 text-weight-light">
					Data Pengguna
				</h2>
			</template>
		</BannerTitle>

		<q-card class="my-card q-my-sm">
			<q-card-section class="bg-green-7 text-green-1 q-pa-sm">
				<div class="text-body1 text-bold">{{ user.name }}</div>
				<div class="text-body2">
					{{ user.email }} ({{ user.username }})
				</div>
			</q-card-section>
			<q-card-section class="bg-green-11 q-pa-sm">
				<q-list bordered="" separator="" class="bg-green-1">
					<q-item
						tag="label"
						v-ripple
						v-for="(group, index) in groups"
						:key="index"
					>
						<q-item-section>
							<q-item-label>{{ group.title }}</q-item-label>
							<q-item-label caption="">
								{{ group.description }}
							</q-item-label>
						</q-item-section>
						<q-item-section side>
							<q-toggle
								color="green-10"
								v-model="group.value"
								:true-value="true"
								:false-value="false"
								@click="
									setGroup(
										group.key,
										group.title,
										group.value
									)
								"
							/>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>

			<q-card-actions class="bg-green-6">
				<q-btn
					label="Hapus"
					color="negative"
					@click="deleteUser(user.id)"
				/>
			</q-card-actions>
		</q-card>
		<!-- <pre>{{ user }}</pre>
    <pre>{{ groups }}</pre> -->
	</div>
</template>
<script setup>
import { useQuasar } from "quasar";
import BannerTitle from "src/components/BannerTitle.vue";
import { apiTokened } from "src/config/api";
import User from "src/models/User";
import UserGroup from "src/models/UserGroup";
import { forceRerender } from "src/utils/buttons-click";
import { notifyConfirm, notifyError, notifySuccess } from "src/utils/notify";
import toArray from "src/utils/to-array";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const user = reactive({});
// const group = reactive({});
const groups = reactive([]);
const route = useRoute();
const userId = route.params.id;
async function fetchUser() {
	const response = await User.getById({ id: userId });
	if (!response) return;
	Object.assign(user, response.data.user);
	Object.assign(groups, response.data.groups);
}
onMounted(async () => await fetchUser());

const router = useRouter();
const $q = useQuasar();
const setGroup = async (group, title, value) => {
	let message = null;
	if (value) message = `Tetapkan sebagai <strong>${title}</strong>?`;
	else message = `Hapus dari group <strong>${title}</strong>?`;
	// console.log("🚀 ~ setGroup ~ message:", message);

	if (value) {
		await UserGroup.addToGroup({
			userId: user.id,
			group,
			message,
		});
	} else {
		await UserGroup.removeFromGroup({
			userId: user.id,
			group,
			message,
		});
	}

	forceRerender();
};

const deleteUser = async (id) => {
	const response = await User.remove({ id });
	if (!response) return;
	notifySuccess(response.message);
	router.go(-1);
};
</script>
