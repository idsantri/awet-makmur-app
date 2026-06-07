<template>
	<q-card
		class="my-card bg-secondary text-green-1 q-pa-lg bg-green-7 text-green-11"
	>
		<q-img
			alt="logo"
			src="/icons/icon-512x512.png"
			class="q-mb-md text-center"
			style="
				width: 128px;
				height: 128px;
				margin: auto;
				border-radius: 50%;
				align-items: center;
				justify-content: center;
				display: flex;
				margin-bottom: 20px;
				margin-top: 20px;
			"
		/>
		<q-card-section class="no-padding q-mb-md">
			<h1 class="title">
				Aplikasi
				<span class="">{{ constanta.APP_NAME_1 }}</span>
				<br /><span class="brand">{{ constanta.APP_NAME_2 }}</span>
			</h1>
			<q-separator dark style="margin-top: 60px" />
			<h2 class="sub-title">{{ title }}</h2>
		</q-card-section>

		<q-card flat v-if="errors.length > 0" class="q-ma-xs" id="error">
			<q-card-section class="q-pa-xs bg-red-2 text-red">
				<ul class="q-my-xs">
					<li v-for="(error, index) in errors" :key="index">
						<span v-html="error"></span>
					</li>
				</ul>
			</q-card-section>
		</q-card>

		<q-card-section class="no-padding no-margin">
			<router-view @title="handleTitle" @errors="handleErrors" />
		</q-card-section>
	</q-card>
</template>

<script setup>
import constanta from "src/config/constanta";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const title = ref("Autentikasi");
const handleTitle = (value) => (title.value = value);

const errors = ref([]);
const handleErrors = (value) => (errors.value = value);
</script>

<style scoped>
.title {
	display: block;
	font-size: 2em;
	margin: 0 auto;
	padding: 0;
	text-align: center;
	height: 40px;
	line-height: 40px;
}

.brand {
	font-size: 1.2em;
	font-weight: 500;
}

.sub-title {
	font-size: 1.7em;
	margin: 0 auto;
	margin-top: 10px;
	padding: 0;
	font-weight: 500;
	text-align: center;
	height: 30px;
	line-height: 30px;
}

.my-card {
	max-width: 375px;
	padding: 15px;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	-ms-transform: translateX(-50%) translateY(-50%);
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
</style>
