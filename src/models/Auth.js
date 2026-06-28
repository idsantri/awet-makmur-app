import BaseModel from "./baseModel";

class Auth extends BaseModel {
	constructor() {
		super("auth");
	}

	async register(data) {
		const response = await this.api.post(`${this._path}/register`, data);
		return response.data;
	}

	async login(data) {
		const response = await this.api.post(`${this._path}/login`, data);
		return response.data;
	}

	async logout() {
		const response = await this.api.post(`${this._path}/logout`);
		return response.data;
	}

	async forgotPassword(data) {
		const response = await this.api.post(
			`${this._path}/password/forgot`,
			data
		);
		return response.data;
	}

	async resetPassword(data) {
		const response = await this.api.post(
			`${this._path}/password/reset`,
			data
		);
		return response.data;
	}

	async resendEmail(data) {
		const response = await this.api.post(
			`${this._path}/email/resend`,
			data
		);
		return response.data;
	}

	async getProfile() {
		const response = await this.api.get(`${this._path}/profile`);
		return response.data;
	}

	async updateProfile({ data }) {
		const response = await this.api.update(`${this._path}/profile`, data);
		return response.data;
	}
}
export default new Auth();
