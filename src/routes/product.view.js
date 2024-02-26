import ProductManager from "../controllers/productManager.js";
import { Router } from "express";

const productManager = new ProductManager();
const router = Router();

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));

    res.render("product", product);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
