<template>
	<q-inner-loading :showing="loading" color="green">
		<q-spinner-tail size="8em" />
	</q-inner-loading>
</template>
<script setup>
defineProps({
	loading: { type: Boolean, default: false },
});
</script>
<style lang=""></style>
