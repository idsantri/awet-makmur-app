import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "src/utils/notify";
export default defineStore("orders", {
  state: () => {
    return {
      orders: []
    };
  },

  getters: {
    getOrders: (state) => {
      state.orders.forEach((item) => {
        item.sub_total =
          parseInt(item.selling_price) * parseFloat(item.quantity) -
          parseInt(item.discount) +
          parseInt(item.cost);
      });
      return state.orders;
    }
  },

  actions: {
    addOrder(payload) {
      if (this.orders.some((order) => order.id == payload.id)) {
        return notifyError("Produk ini sudah ada di keranjang!");
      }
      payload.discount = 0;
      payload.cost = 0;
      payload.quantity = 1;
      this.orders.push(payload);
      return notifySuccess("Berhasil memasukkan produk ke keranjang.");
    },

    removeOrder(i) {
      const index = this.orders.findIndex((order) => order.id == i);
      if (index > -1) {
        this.orders.splice(index, 1);
      }
    },

    editQuantity(i, v) {
      const index = this.orders.findIndex((order) => order.id == i);
      if (index > -1) {
        this.orders.quantity = v;
      }
    },

    clearOrders() {
      this.orders = [];
    }
  },
  persist: true
});
