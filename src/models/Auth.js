import { notifyError } from "src/utils/notify";
import api from ".";

class Auth {
	constructor() {
		this.path = "auth";
		this.api = api;
	}

	async register(data) {
		const response = await this.api.post(`${this.path}/register`, data);
		return response.data;
	}

	async login(data) {
		const response = await this.api.post(`${this.path}/login`, data);
		return response.data;
	}

	async logout() {
		const response = await this.api.post(`${this.path}/logout`);
		return response.data;
	}

	async forgotPassword(data) {
		const response = await this.api.post(
			`${this.path}/password/forgot`,
			data
		);
		return response.data;
	}

	async resetPassword(data) {
		const response = await this.api.post(
			`${this.path}/password/reset`,
			data
		);
		return response.data;
	}

	async resendEmail(data) {
		const response = await this.api.post(`${this.path}/email/resend`, data);
		return response.data;
	}

	async getProfile() {
		try {
			const response = await this.api.get(`${this.path}/profile`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async updateProfile(data) {
		try {
			const response = await this.api.put(`${this.path}/profile`, data);
			return response.data;
		} catch (error) {
			console.log(error);
			notifyError(error.response.data.message);
			return false;
		}
	}
}
export default new Auth();
