<template>
	<pre>
	{{ transactions }}
</pre
	>
</template>
<script setup>
import BannerTitle from "src/components/BannerTitle.vue";
import { apiTokened } from "src/config/api";
import toArray from "src/utils/to-array";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const year = route.params.year;
const month = route.params.month;

const transactions = reactive([]);
try {
	const response = await apiTokened.get(
		`reports/transactions/${year}${month ? "/" + month : ""}`
	);
	Object.assign(transactions, response.data.data.transactions);
} catch (error) {
	console.log(error);
}
</script>
