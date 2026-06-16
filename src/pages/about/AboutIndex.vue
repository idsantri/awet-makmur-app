import { resolveDirective } from 'vue'; import { resolveDirective } from 'vue';
<template>
	<q-card class="q-ma-sm">
		<q-card-section>
			<div class="text-subtitle1">Tentang Aplikasi</div>
			<div class="text-body1 text-uppercase">
				{{ constanta.APP_NAME_1 }} {{ constanta.APP_NAME_2 }}
			</div>
		</q-card-section>
		<q-card-section class="q-pt-none">
			<div v-for="(item, index) in releases" :key="index" class="q-mb-sm">
				<q-list bordered separator>
					<q-item-label header class="bg-green-1 q-pa-sm"
						>Versi {{ item.ver }}
						<span class="text-caption"> ({{ item.date }}) </span>
					</q-item-label>

					<q-item v-for="(item, index) in item.release" :key="index">
						<q-item-section>
							<q-item-label>{{ index }}</q-item-label>
							<q-item-label caption>
								<ul
									class="q-ma-none q-pl-md"
									style="list-style-type: disc; color: #555"
								>
									<li v-for="(i, x) in item" :key="x">
										{{ i }}
									</li>
								</ul>
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</div>
		</q-card-section>
	</q-card>
</template>
<script setup>
import releases from "../../config/releases";
import constanta from "src/config/constanta";
</script>

<style scoped></style>
