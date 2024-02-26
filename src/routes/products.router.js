import ProductManager from "../controllers/productManager.js";
import { Router } from "express";

const productManager = new ProductManager();
const router = Router();

router.post("/", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;
  const thumbnail = req.body.thumbnail ? req.body.thumbnail : [];

  try {
    const createProduct = await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );

    if (createProduct === false) {
      res.status(400).json("All fields are required");
    } else if (createProduct === undefined) {
      res.status(400).json("Product already exists");
    } else {
      res.status(201).json("Successfully created product");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await productManager.getProducts();

    if (products === undefined) {
      res.status(200).json([]);
    }

    if (!limit || limit < 1) {
      res.status(200).json(products);
    } else {
      const limitedProducts = products.slice(0, limit);
      res.status(206).json(limitedProducts);
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.getProductById(Number(pid));

    if (product === undefined) {
      res.status(404).json("Not found");
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const props = req.body;

  try {
    const updatedProduct = await productManager.updateProduct(
      Number(pid),
      props
    );

    if (updatedProduct === undefined) {
      res.status(404).json(`Product with id: ${pid} not found.`);
    } else if (updatedProduct === false) {
      res.status(404).json("Cannot update 'id' or 'code' property");
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const product = await productManager.deleteProduct(Number(pid));

    if (product === undefined) {
      res.status(404).json("Not found");
    } else {
      res.status(200).json(`Product with id: ${pid} was removed`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
