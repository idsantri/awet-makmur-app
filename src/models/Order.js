import BaseModel from "./BaseModel";

class Order extends BaseModel {
	constructor() {
		super("orders");
	}
}
export default new Order();
