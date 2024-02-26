import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import productsView from "./products.view.js";
import cartView from "./cart.view.js";
import productView from "./product.view.js";

const router = (app) => {
  //Postman
  app.use("/api/products", productsRouter);
  app.use("/api/carts", cartsRouter);
  //Navegador
  app.use("/products", productsView);
  app.use("/product", productView);
  app.use("/cart", cartView);
};

export default router;
