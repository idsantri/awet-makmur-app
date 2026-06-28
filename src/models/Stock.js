import BaseModel from "./BaseModel";

class Stock extends BaseModel {
	constructor() {
		super("stocks");
	}
}
export default new Stock();
