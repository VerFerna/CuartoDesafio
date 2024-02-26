import ProductManager from "../controllers/productManager.js";
import { Router } from "express";
const productManager = new ProductManager();
const router = Router();

router.get("/upload", (req, res) => {
  res.render("upload", {});
});

router.post("/upload", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const thumbnail = Array.isArray(req.body.thumbnail)
    ? req.body.thumbnail
    : [req.body.thumbnail];

  try {
    await productManager.addProduct(
      title,
      description,
      Number(price),
      thumbnail,
      code,
      Number(stock),
      category
    );
    res.redirect("/");
  } catch (error) {
    res.status(400).json("Bad Request");
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (!limit || limit < 1) {
      res.render("products", {
        products: products,
      });
    } else {
      const limitedProducts = products.slice(0, limit);
      res.render("products", {
        products: limitedProducts,
      });
    }
  } catch (error) {
    res.status(400).json("Bad Request");
  }
});

export default router;
