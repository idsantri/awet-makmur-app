import { notifyError } from "src/utils/notify";
import BaseModel from "./BaseModel";

class Stock extends BaseModel {
	constructor() {
		super("stocks");
	}

	async getPivot() {
		try {
			const response = await this._api.get(`${this._path}/pivot`);
			return response.data;
		} catch (error) {
			notifyError(error.response.data.message);
			return false;
		}
	}
}
export default new Stock();
