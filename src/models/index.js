import axios from "axios";
import { useAuthStore } from "src/stores/auth-store";
import { notifyError } from "src/utils/notify";

const api = axios.create({
	baseURL: process.env.BASE_URL_API,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const authStore = useAuthStore();
	const token = authStore.getToken;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	config.headers["X-Timezone"] = timezone;
	return config;
});

// response
api.interceptors.response.use(
	(response) => {
		// console.log('🚀 ~ response:', response);
		return response;
	},
	(error) => {
		// Tangani kesalahan jaringan atau koneksi di sini
		if (!error.response) {
			// Kesalahan tidak ada respons (seperti jaringan terputus)
			// console.log('e', error);
			notifyError("Tidak dapat terhubung ke server");
		} else {
			//  'code' => 'TOKEN_EXPIRED',
			//  'code' => 'EMAIL_NOT_VERIFIED',

			// Teruskan kesalahan lain ke blok catch berikutnya
			return Promise.reject(error);
		}
	}
);

export default api;
