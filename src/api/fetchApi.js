import { apiTokened } from "src/config/api";
import { notifyError, notifyWarningExpired } from "src/utils/notify";
import toArray from "src/utils/to-array";
import auth from "src/stores/auth-store";

async function fetchApi(url, notificationMessage = true) {
	try {
		const response = await apiTokened.get(url);
		const result = response.data.data;
		return result;
	} catch (error) {
		// console.log(error);
		const status = error.response.status;
		const message = error.response.data.message;
		const arrMessage = toArray(message);
		let isExp = false;

		if (message) {
			for (const msg of arrMessage) {
				if (
					msg.toLowerCase().includes("expired") ||
					msg.toLowerCase().includes("login kembali")
				) {
					isExp = true;
					break;
				}
			}
		}

		if (status == 401 && isExp) {
			arrMessage.forEach((msg) => {
				notifyWarningExpired(msg);
			});
			auth().$reset();
		} else if (message && notificationMessage) {
			arrMessage.forEach((msg) => {
				notifyError(msg);
			});
		} else {
			console.log(error);
		}
	}
}

export default fetchApi;
