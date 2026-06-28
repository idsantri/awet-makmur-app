import BaseModel from "./baseModel";

class Stock extends BaseModel {
	constructor() {
		super("stocks");
	}
}
export default new Stock();
