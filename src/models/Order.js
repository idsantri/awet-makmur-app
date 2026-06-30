import BaseModel from "./BaseModel";

class Order extends BaseModel {
	constructor() {
		super("orders");
	}

	async listYear() {
		try {
			const response = await this._api.get(`${this._path}/list-years`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}
export default new Order();
