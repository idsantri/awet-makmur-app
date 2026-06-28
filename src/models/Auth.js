import BaseModel from "./baseModel";

class Auth extends BaseModel {
	constructor() {
		super("auth");
	}

	async register({ data }) {
		return await api.post(`${this._path}/register`, data);
	}

	async login({ data }) {
		return await api.post(`${this._path}/login`, data);
	}

	async logout() {
		return await api.post(`${this._path}/logout`);
	}

	async forgotPassword({ data }) {
		return await api.post(`${this._path}/password-forgot`, data);
	}

	async resetPassword({ data }) {
		return await api.post(`${this._path}/password-reset`, data);
	}

	async resendEmail({ data }) {
		return await api.post(`${this._path}/email-resend`, data);
	}

	async profile() {
		return await api.get(`${this._path}/profile`);
	}

	async updateProfile({ data }) {
		return await api.update(`${this._path}/profile`, data);
	}
}
export default new Auth();
