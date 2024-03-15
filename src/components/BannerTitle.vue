<template>
	<q-banner class="bg-green-8 text-green-11 q-pa-sm" inline-actions>
		<slot name="title"></slot>
		<!-- TOMBOL CARI -->
		<template v-slot:action>
			<slot name="buttons"></slot>
		</template>
	</q-banner>
</template>
