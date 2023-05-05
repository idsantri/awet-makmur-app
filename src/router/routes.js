const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue")
      },
      {
        path: "home",
        component: () => import("src/pages/home/HomeIndex.vue")
      },
      {
        path: "products/:id",
        component: () => import("src/pages/products/ProductDetail.vue")
      },
      {
        path: "products/categories/:category",
        component: () => import("src/pages/products/ProductAll.vue")
      },
      {
        path: "orders/current",
        component: () => import("src/pages/orders/OrderCurrent.vue")
      },
      {
        path: "orders/:id",
        component: () => import("src/pages/orders/OrderDetail.vue")
      },
      {
        path: "stores/:id/stocks",
        component: () => import("src/pages/stores/stocks/StoresStocks.vue")
      },
      {
        path: "stores/:id/orders",
        component: () => import("src/pages/stores/orders/StoresOrders.vue")
      },
      {
        path: "settings",
        component: () => import("src/pages/settings/IndexSetting.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/errors/ErrorNotFound.vue")
  }
];

export default routes;
