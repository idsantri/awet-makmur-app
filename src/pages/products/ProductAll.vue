<template>
	<div class="q-ma-sm">
		<BannerTitle>
			<template #title>
				<h2 class="no-margin text-green-11 text-h6 text-weight-light">
					Kategori:
					<span v-if="products.length > 0">{{
						products[0].category_name
					}}</span>
					<span v-else>{{ titleCase($route.params.category) }}</span>
				</h2>
			</template>
			<template #buttons>
				<q-btn
					square
					padding="sm"
					color="green-12"
					class="text-green-10 q-ml-sm"
					icon="add"
					@click="showModalProduct = true"
				/>
				<q-btn
					square
					padding="sm"
					color="green-13"
					class="text-green-10 q-ml-sm"
					icon="search"
					@click="showModalSearch = true"
				/>
			</template>
		</BannerTitle>
		<div v-if="!products.length > 0">
			<q-banner class="bg-red-2 text-red-10 q-mt-sm">
				<div class="text-body1 text-center">
					Tidak ada data untuk ditampilkan!
				</div>
			</q-banner>
		</div>
		<q-card
			v-else
			class="my-card q-my-sm"
			flat
			bordered
			v-for="(product, index) in products"
			:key="index"
		>
			<q-card-section class="q-pt-xs no-padding">
				<q-item
					clickable
					v-ripple
					:to="/products/ + product.id"
					class="q-pa-sm bg-green-7 text-green-11"
				>
					<q-item-section class="">
						<div class="text-h6">
							{{ product.name }}
							<span
								v-show="product.brand"
								class="text-body2 text-italic"
								>&mdash; {{ product.brand }}</span
							>
						</div>
						<div class="text-subtitle2 text-green-12">
							Rp{{ digitSeparator(product.selling_price) }}
						</div>
					</q-item-section>
				</q-item>
				<!-- Gunakan items-start agar kontainer teks bebas memanjang ke bawah secara mandiri -->
				<q-card-section horizontal class="q-ma-sm items-stretch">
					<router-link :to="/products/ + product.id">
						<div v-if="product.image_url" class="col-3">
							<q-img
								class="flex flex-center img"
								:src="product.image_url"
							/>
						</div>
						<div v-else class="col-3">
							<q-img
								class="flex flex-center img"
								src="/no-image.png"
							/>
						</div>
					</router-link>

					<div class="col-9 flex column justify-between q-pl-sm">
						<div
							class="text-caption text-green-9 text-ellipsis-3-lines"
						>
							<span
								v-html="product.description"
								class="description"
							>
							</span>
						</div>
						<div
							class="stock q-mt-md q-mt-auto text-caption q-pa-xs"
						>
							<q-separator
								color="green-13"
								size="1px"
								class="q-mt-md"
							/>
							<div
								v-for="(stock, index) in product.stocks"
								:key="index"
							>
								Stok di {{ stock.store_name }}:
								<span class="text-bold">
									{{ stock.stock }}
								</span>
							</div>
						</div>
					</div>
				</q-card-section>
			</q-card-section>
			<q-separator />
			<q-card-actions class="bg-green-6 q-pa-xs">
				<div class="text-caption q-ml-xs text-green-11">
					Tersisa:
					{{ totalStock(product.id) }} item
				</div>
				<q-space />
				<q-btn
					color="green-11"
					class="text-green-10"
					no-caps
					icon-right="add_shopping_cart"
					label="Jual"
					@click="addToCart(product)"
				/>
			</q-card-actions>
		</q-card>

		<InnerLoading :loading="loading" />

		<q-dialog v-model="showModalProduct">
			<ModalProduct :is-new="true" />
		</q-dialog>

		<q-dialog v-model="showModalSearch">
			<ModalSearch />
		</q-dialog>
	</div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import digitSeparator from "src/utils/digit-separator";
import ordersStore from "src/stores/orders-store";
import ModalProduct from "./ModalProduct.vue";
import ModalSearch from "./ProductSearch.vue";
import BannerTitle from "src/components/BannerTitle.vue";
import titleCase from "src/utils/tittle-case";
import Product from "src/models/Product.js";
import InnerLoading from "src/components/InnerLoading.vue";

const showModalProduct = ref(false);
const showModalSearch = ref(false);
const route = useRoute();
const params = ref(route.params);
const products = ref([]);
let isThrottled = false;
const loading = ref(false);

const totalStock = (productId) => {
	const product = products.value.find((p) => p.id === productId);
	if (!product?.stocks?.length) {
		return 0;
	} else {
		return product.stocks.reduce(
			(total, productStock) => total + productStock.stock,
			0
		);
	}
};

const saveScrollPosition = () => {
	if (isThrottled) return;

	isThrottled = true;
	setTimeout(() => {
		if (window.scrollY !== 0) {
			sessionStorage.setItem(
				"scrollPosition-" + params.value.category,
				window.scrollY
			);
		}
		isThrottled = false;
	}, 200); // 200ms delay
};

const restoreScrollPosition = () => {
	const scrollPosition = sessionStorage.getItem(
		"scrollPosition-" + params.value.category
	);
	if (scrollPosition) {
		// Gunakan nextTick untuk memastikan DOM sudah ter-render
		nextTick(() => {
			window.scrollTo({
				top: parseInt(scrollPosition, 10), // Posisi scroll yang dituju
				behavior: "smooth", // Scroll dengan animasi halus
			});
		});
	}
};
async function fetchProduct() {
	try {
		loading.value = true;
		const response = await Product.getAll({
			category_slug: params.value.category,
		});
		if (response) {
			products.value = response.data.products;
		}
	} finally {
		loading.value = false;
	}
}
onMounted(async () => {
	await fetchProduct();
	nextTick(() => {
		restoreScrollPosition();
	});

	window.addEventListener("scroll", saveScrollPosition);
});

onUnmounted(() => {
	window.removeEventListener("scroll", saveScrollPosition);
});

const addToCart = (product) => {
	ordersStore().addOrder(product);
};
</script>
<style lang="scss" scoped>
.my-card {
	width: 100%;
}

.img {
	height: 100px;
	width: 100px;
	object-fit: cover;
	object-position: center;
}

.description {
	overflow: hidden;
	display: -webkit-box;
	line-clamp: 5;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
}
.text-ellipsis-3-lines {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
