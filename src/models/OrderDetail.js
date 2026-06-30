import { notifyError } from "src/utils/notify";
import BaseModel from "./BaseModel";

class OrderDetail extends BaseModel {
	endPoint = "items";
	constructor() {
		super("orders");
	}

	async getAll({ orderId, params = {} }) {
		try {
			const response = await this._api.get(
				`${this._path}/${orderId}/${this.endPoint}`,
				{ params }
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async getById({ orderId, id, params = {} }) {
		try {
			const response = await this._api.get(
				`${this._path}/${orderId}/${this.endPoint}/${id}`,
				{ params }
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async create({ orderId, data, confirm = false, message = "" }) {
		if (message || confirm) {
			const isConfirmed = await notifyConfirm(
				message || "Simpan data ini?"
			);
			if (!isConfirmed) {
				return false;
			}
		}
		try {
			const response = await this._api.post(
				`${this._path}/${orderId}/${this.endPoint}`,
				data,
				{}
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async update({ orderId, id, data, confirm = false, message = "" }) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || "Update data ini?"
			);

			if (!isConfirmed) {
				return false;
			}
		}
		try {
			const response = await this._api.put(
				`${this._path}/${orderId}/${this.endPoint}/${id}`,
				data,
				{}
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}

	async remove({ orderId, id, confirm = true, message = "" }) {
		if (message || confirm) {
			const isConfirmed = await this._notifyConfirm(
				message || '<span style="color: red">Hapus data ini?</span>'
			);

			if (!isConfirmed) {
				return false;
			}
		}

		try {
			const response = await this._api.remove(
				`${this._path}/${orderId}/${this.endPoint}/${id}`
			);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}
export default new OrderDetail();
