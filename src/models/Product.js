import BaseModel from "./baseModel";

class Product extends BaseModel {
	constructor() {
		super("products");
	}
}
export default new Product();
