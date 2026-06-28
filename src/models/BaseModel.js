import { notifyConfirm } from "src/utils/notify";
import api from ".";

export default class BaseModel {
	constructor(path) {
		this._path = path;
		this.api = api;
	}

	async getAll({ params = {} }) {
		return await api.get(this._path, { params });
	}

	async getById({ id, params = {} }) {
		return await api.get(`${this._path}/${id}`, { params });
	}

	async create({ data, params = {}, confirm = false, message = "" }) {
		if (message || confirm) {
			const isConfirmed = await notifyConfirm(
				message || "Simpan data ini?"
			);
			if (!isConfirmed) {
				return false;
			}
		}
		return await api.post(this._path, data, { params });
	}

	async update({ id, data, params = {}, confirm = false, message = "" }) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || "Update data ini?"
			);

			if (!isConfirmed) {
				return false;
			}
		}
		return await api.update(`${this._path}/${id}`, data, { params });
	}

	async remove({ id, params = {}, confirm = true, message = "" }) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || '<span style="color: red">Hapus data ini?</span>'
			);

			if (!isConfirmed) {
				return false;
			}
		}
		return await api.delete(`${this._path}/${id}`, { params });
	}
}
