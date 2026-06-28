import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", {
	state: () => ({
		token: null,
		user: null,
		groups: null,
		roles: null,
	}),
	getters: {
		getUser: (state) => state.user,
		getToken: (state) => state.token,
		getGroup: (state) => state.groups,
		getGroup: (state) => state.roles,
	},
	actions: {
		setUser(payload) {
			//   console.log("setuser", payload);
			if (payload.groups) this.group = payload.groups;
			if (payload.user) this.user = payload.user;
			if (payload.token) this.token = payload.token;
		},

		clearUser() {
			this.groups = null;
			this.user = null;
			this.token = null;
			this.roles = null;
		},
	},
	persist: true,
});

export { useAuthStore };
