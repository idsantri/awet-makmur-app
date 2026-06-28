import BaseModel from "./BaseModel";

class OrderDetail extends BaseModel {
	constructor() {
		super("orders");
		endPoint = "items";
	}

	async getAll({ orderId, params = {} }) {
		return await this._api.get(`${this._path}/${orderId}/${endPoint}`, {
			params,
		});
	}

	async getById({ orderId, id, params = {} }) {
		return await api.get(`${this._path}/${orderId}/${endPoint}/${id}`, {
			params,
		});
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
		return await api.post(`${this._path}/${orderId}/${endPoint}`, data, {});
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
		return await api.update(
			`${this._path}/${orderId}/${endPoint}/${id}`,
			data,
			{}
		);
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
		return await api.delete(`${this._path}/${orderId}/${endPoint}/${id}`);
	}
}
export default new OrderDetail();
