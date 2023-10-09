<template>
	<q-list class="text-green-1">
		<!-- HOME -->
		<!-- <q-item-label header class="text-green-10 q-pb-none">
      <div class="text-body1 text-green-1">Setting</div>
      <div class="text-caption">Pengaturan</div>
    </q-item-label> -->
		<q-item clickable v-ripple to="/home">
			<q-item-section avatar>
				<q-icon color="green-1" name="home" />
			</q-item-section>
			<q-item-section>
				<q-item-label>Beranda</q-item-label>
				<q-item-label caption>Halaman Awal</q-item-label>
			</q-item-section>
		</q-item>
		<q-separator dark />

		<!-- KATEGORI -->
		<q-item-label header class="text-green-10 q-pb-none">
			<div class="text-body1 text-green-1">Produk</div>
			<div class="text-caption">Berdasarkan kategori</div>
		</q-item-label>
		<q-item
			clickable
			v-ripple
			v-for="(category, index) in categoryList"
			:key="index"
			:to="category.link"
		>
			<q-item-section avatar>
				<q-icon color="green-1" :name="category.icon" />
			</q-item-section>
			<q-item-section>
				<q-item-label>{{ category.name }}</q-item-label>
				<q-item-label caption>{{ category.caption }}</q-item-label>
			</q-item-section>
		</q-item>

		<q-separator dark />
		<div v-for="(store, index) in storeList" :key="index">
			<q-expansion-item
				expand-separator
				:label="store.name"
				:caption="store.caption"
				header-class="text-body1 text-green-1"
				expand-icon-class="text-green-1"
			>
				<!-- STOCK -->
				<q-item clickable :to="store.stock.link">
					<q-item-section avatar>
						<q-icon color="green-1" :name="store.stock.icon" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ store.stock.name }}</q-item-label>
						<q-item-label caption>{{
							store.stock.caption
						}}</q-item-label>
					</q-item-section>
				</q-item>

				<!-- ORDERS -->
				<q-item clickable :to="store.order.link">
					<q-item-section avatar>
						<q-icon color="green-1" :name="store.order.icon" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{ store.order.name }}</q-item-label>
						<q-item-label caption>{{
							store.order.caption
						}}</q-item-label>
					</q-item-section>
				</q-item>
			</q-expansion-item>
		</div>

		<q-separator dark />

		<q-expansion-item
			expand-separator
			label="Laporan"
			caption="Halaman Laporan"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<q-list>
				<q-item clickable v-ripple to="/reports/products-stock">
					<q-item-section avatar>
						<q-icon color="green-1" name="summarize" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Laporan Stok</q-item-label>
						<q-item-label caption>Stok Produk</q-item-label>
					</q-item-section>
				</q-item>

				<q-item
					v-if="isAdmin"
					clickable
					v-ripple
					to="/reports/periodic"
				>
					<q-item-section avatar>
						<q-icon color="green-1" name="summarize" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Laporan Berkala</q-item-label>
						<q-item-label caption
							>Periodik Tahunan/Bulanan</q-item-label
						>
					</q-item-section>
				</q-item>
			</q-list>
		</q-expansion-item>

		<!-- SETTING -->
		<q-separator dark />
		<!-- <q-item-label header class="text-green-10 q-pb-none">
      <div class="text-body1 text-green-1">Setting</div>
      <div class="text-caption">Pengaturan</div>
    </q-item-label> -->

		<q-expansion-item
			expand-separator
			label="Pengaturan"
			caption="Aplikasi dan Pengguna"
			header-class="text-body1 text-green-1"
			expand-icon-class="text-green-1"
		>
			<!-- APP -->
			<q-item clickable v-ripple to="/settings/app">
				<q-item-section avatar>
					<q-icon color="green-1" name="settings" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Aplikasi</q-item-label>
					<q-item-label caption>Pengaturan Aplikasi</q-item-label>
				</q-item-section>
			</q-item>

			<!-- USER -->
			<q-item clickable v-ripple to="/settings/users">
				<q-item-section avatar>
					<q-icon color="green-1" name="manage_accounts" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Pengguna</q-item-label>
					<q-item-label caption>Pengaturan Pengguna</q-item-label>
				</q-item-section>
			</q-item>
		</q-expansion-item>

		<div v-if="isAdmin">
			<q-separator dark />
			<q-item clickable v-ripple to="/about">
				<q-item-section avatar>
					<q-icon color="green-1" name="info" />
				</q-item-section>
				<q-item-section>
					<q-item-label>Tentang</q-item-label>
					<q-item-label caption>Tentang Aplikasi</q-item-label>
				</q-item-section>
			</q-item>
		</div>
	</q-list>
</template>

<script setup>
import { apiTokened } from "src/config/api";
import { onMounted, reactive, ref } from "vue";
import authState from "src/stores/auth-store";

const isAdmin = ref(false);
const storeList = reactive([]);
const categoryList = reactive([]);

onMounted(async () => {
	await getData();
	isAdmin.value = authState().groups.admin;
});

async function getData() {
	try {
		const responseStore = await apiTokened.get(`stores`);
		responseStore.data.data.stores.forEach((store) => {
			storeList.push({
				name: store.name,
				caption: store.address,
				icon: "store",
				// link: `stores/${store.id}/stocks`
				stock: {
					name: "Stok",
					caption: "Data Stok dan Hitung Zakat",
					icon: "inventory",
					link: `/stores/${store.id}/stocks`,
				},
				order: {
					name: "Transaksi",
					caption: "Daftar Transaksi",
					icon: "local_mall",
					link: `/stores/${store.id}/orders`,
				},
			});
		});

		const responseCategory = await apiTokened.get(`categories`);
		responseCategory.data.data.categories.forEach((category) => {
			categoryList.push({
				name: category.name,
				caption: category.description,
				icon: category.icon,
				link: `/products/categories/${category.slug}`,
			});
		});
	} catch (error) {
		console.log("Not Found: store -> list", error.response);
	}
}
</script>
