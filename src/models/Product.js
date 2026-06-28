import BaseModel from "./BaseModel";

class Product extends BaseModel {
	constructor() {
		super("products");
	}
}
export default new Product();
