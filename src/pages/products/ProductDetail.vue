<template>
	<q-card class="q-ma-sm">
		<q-card-section class="no-padding">
			<div v-if="product.image_url">
				<q-img
					class="img"
					style="height: 30vh"
					:src="product.image_url"
				>
				</q-img>
				<q-btn
					push
					round
					glossy
					unelevated
					color="green-8"
					text-color="green-11"
					icon="camera_alt"
					class="absolute all-pointer-events"
					style="bottom: 8px; right: 8px"
					@click="showUploader = true"
				/>
			</div>
			<div v-else>
				<q-img class="img" style="max-height: 30vh" src="/no-image.png">
					<q-btn
						push
						round
						glossy
						unelevated
						color="green-8"
						text-color="green-11"
						icon="camera_alt"
						class="absolute all-pointer-events"
						style="bottom: 8px; right: 8px"
						@click="showUploader = true"
					/>
				</q-img>
			</div>
		</q-card-section>
		<q-card-section class="no-padding">
			<BannerTitle>
				<template #title>
					<div class="text-h6">{{ product.name }}</div>
					<div class="text-subtitle2">
						Rp{{ digitSeparator(product.selling_price) }}
					</div>
					<div class="text-caption">
						Tersisa:
						{{ totalStock }}
						item
					</div>
				</template>
				<template #buttons>
					<q-btn
						color="green-11"
						class="text-green-10"
						no-caps
						icon-right="add_shopping_cart"
						label="Jual"
						@click="addToCart"
					/>
				</template>
			</BannerTitle>
		</q-card-section>

		<q-card-section class="q-pa-sm">
			<div class="row items-center">
				<div class="text-body1">Deskripsi:</div>
				<q-space />
				<q-btn
					color="green-10"
					outline
					no-caps
					icon-right="edit"
					label="Edit"
					@click="showModalDescription = true"
				/>
			</div>
			<span v-if="!product.description">Tidak ada deskripsi</span>
			<span
				v-else
				class="text-green-10 text-caption"
				v-html="product.description"
			></span>
		</q-card-section>
		<q-card-section class="no-padding data">
			<q-markup-table flat class="text-green-10">
				<thead>
					<tr class="bg-green-1">
						<th class="text-left">
							<div class="text-body1">Data Produk</div>
						</th>
						<th class="text-right">
							<q-btn
								color="green-10"
								outline
								no-caps
								icon-right="edit"
								label="Edit"
								@click="showModalProduct = true"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="text-left">Nama</td>
						<td class="text-left multi-line">
							{{ product?.name?.toUpperCase() }}
						</td>
					</tr>
					<tr>
						<td class="text-left">Merek</td>
						<td class="text-left">{{ product.brand }}</td>
					</tr>
					<tr>
						<td class="text-left">Kategori</td>
						<td class="text-left">{{ product.category_name }}</td>
					</tr>
					<tr>
						<td class="text-left">Harga Dasar</td>
						<td class="text-right">
							Rp{{ digitSeparator(product.base_price) }}
						</td>
					</tr>
					<tr>
						<td class="text-left">Harga Jual</td>
						<td class="text-right">
							Rp{{ digitSeparator(product.selling_price) }}
						</td>
					</tr>
					<tr>
						<td class="text-left">Keuntungan</td>
						<td class="text-right">
							Rp{{
								digitSeparator(
									parseInt(product.selling_price) -
										parseInt(product.base_price)
								)
							}}
						</td>
					</tr>
				</tbody>
			</q-markup-table>
			<q-markup-table flat class="text-green-10">
				<thead>
					<tr class="bg-green-1">
						<th class="text-left">
							<div class="text-body1">Stok</div>
						</th>
						<th colspan="2" class="text-right">
							<q-btn
								color="green-10"
								outline
								no-caps
								icon-right="edit"
								label="Edit"
								@click="showModalStock = true"
							/>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(stock, index) in product.stocks" :key="index">
						<td class="text-left">{{ stock.store_name }}</td>
						<td class="text-left">{{ stock.stock }}</td>
						<td class="text-right">
							<q-btn
								icon="delete"
								label="Hapus"
								no-caps=""
								color="red"
								flat
								@click="deleteStock(stock.id, stock.store_name)"
							/>
						</td>
					</tr>
				</tbody>
			</q-markup-table>
		</q-card-section>
		<q-dialog v-model="showModalDescription">
			<modal-description
				:product-description="product.description"
				:product-id="parseInt(product.id)"
			/>
		</q-dialog>

		<q-dialog v-model="showModalStock">
			<modal-stock
				:product-id="parseInt(product.id)"
				:product-name="product.name"
			/>
		</q-dialog>

		<q-dialog v-model="showModalProduct">
			<modal-product :is-new="false" :product="product" />
		</q-dialog>

		<my-upload
			field="image"
			langType="en"
			:langExt="translate"
			no-circle
			@crop-success="cropSuccess"
			@crop-upload-success="cropUploadSuccess"
			@crop-upload-fail="cropUploadFail"
			v-model="showUploader"
			:width="500"
			:height="500"
			:url="urlUpload"
			:params="paramsImage"
			:headers="headers"
			img-format="png"
		></my-upload>

		<div class="flex fixed-bottom-right q-mr-md q-mb-xl q-gutter-md">
			<q-btn
				push
				color="green"
				round
				icon="search"
				@click="showModalSearch = true"
			/>
		</div>

		<q-dialog v-model="showModalSearch">
			<ModalSearch />
		</q-dialog>
		<InnerLoading :loading="loading" />
	</q-card>
</template>

<script setup>
import digitSeparator from "../../utils/digit-separator";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import ModalDescription from "./ModalDescription.vue";
import ModalProduct from "./ModalProduct.vue";
import ModalStock from "./ModalStock.vue";
import { notifySuccess } from "src/utils/notify";
import { forceRerender } from "src/utils/buttons-click";
import myUpload from "vue-image-crop-upload";
import ordersStore from "src/stores/orders-store";
import ModalSearch from "./ProductSearch.vue";
import BannerTitle from "src/components/BannerTitle.vue";
import Product from "src/models/Product";
import api from "src/models";
import { useAuthStore } from "src/stores/auth-store";
import Stock from "src/models/Stock";
import InnerLoading from "src/components/InnerLoading.vue";

const route = useRoute();
const params = ref(route.params);
const product = reactive({});
const showModalDescription = ref(false);
const showModalProduct = ref(false);
const showModalStock = ref(false);
const showModalSearch = ref(false);
const authStore = useAuthStore();
const loading = ref(false);

const deleteStock = async (id, store) => {
	const message = `<span style="color:red">Hapus stok produk di toko ${store}?</span>`;

	const response = await Stock.remove({ id, message });
	if (response) {
		notifySuccess(response.message);
		forceRerender();
	}
};

const totalStock = computed(() => {
	if (!product?.stocks?.length) return 0;
	return product.stocks.reduce((total, stock) => total + stock.stock, 0);
});

const addToCart = () => {
	ordersStore().addOrder(product);
};

const translate = {
	hint: "Klik atau tarik file gambar ke sini untuk upload",
	loading: "Uploading…",
	noSupported: "Browser is not supported, please use IE10+ or other browsers",
	success: "Upload berhasil",
	fail: "Upload gagal",
	preview: "Preview",
	btn: {
		off: "Gagal",
		close: "Tutup",
		back: "Kembali",
		save: "Simpan",
	},
	error: {
		onlyImg: "Hanya gambar",
		outOfSize: "Gambar melebihi batas ukuran: ",
		lowestPx: "Ukuran gambar terlalu rendah. Setidaknya diharapkan: ",
	},
};

const showUploader = ref(false);
const imgDataUrl = ref("");
const urlUpload = `${api.defaults.baseURL}/products/${params.value.id}/image`;
const headers = {
	Authorization: `Bearer ${authStore.getToken}`,
};

const paramsImage = {};
const cropSuccess = (imgData, field) => {
	imgDataUrl.value = imgData;
	console.log(imgData);
	console.log(field);
};

const cropUploadSuccess = (jsonData, field) => {
	// console.log(jsonData);
	// console.log('field: ' + field);
	notifySuccess(jsonData.message);
	forceRerender();
};

/**
 * upload fail
 *
 * [param] status    server api return error status, like 500
 * [param] field
 */
const cropUploadFail = (status, field) => {
	console.log(status);
	console.log("field: " + field);
};

async function fetchProduct() {
	try {
		loading.value = true;
		const response = await Product.getById({
			id: params.value.id,
		});
		if (response) {
			Object.assign(product, response.data.product);
			if (response.data.product.stocks.length == 0)
				showModalStock.value = true;
		}
	} finally {
		loading.value = false;
	}
}
onMounted(async () => {
	await fetchProduct();
});
</script>
<style lang="scss" scoped>
.data {
	max-width: 500px;
}

th,
td {
	padding-left: 8px;
	padding-right: 8px;
}
</style>
