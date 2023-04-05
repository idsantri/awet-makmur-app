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
        path: "products/:id",
        component: () => import("src/pages/products/ProductDetail.vue")
      },
      {
        path: "products/categories/:category",
        component: () => import("src/pages/products/ProductAll.vue")
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
