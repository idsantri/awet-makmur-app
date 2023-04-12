import { defineStore } from "pinia";
import { notifyError, notifySuccess } from "src/utils/notify";
export default defineStore("orders", {
  state: () => {
    return {
      orders: []
    };
  },

  getters: {
    getOrders: (state) => state.orders
  },

  actions: {
    addOrder(payload) {
      if (this.orders.some((order) => order.id == payload.id)) {
        return notifyError("Produk ini sudah ada di keranjang!");
      }
      this.orders.push(payload);
      return notifySuccess("Berhasil memasukkan produk ke keranjang.");
    },

    removeOrder(id) {
      return this.orders.filter((order) => order.id != id);
    },

    clearOrders() {
      this.orders = [];
    }
  },
  persist: true
});
