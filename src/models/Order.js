import BaseModel from "./baseModel";

class Order extends BaseModel {
	constructor() {
		super("orders");
	}
}
export default new Order();
