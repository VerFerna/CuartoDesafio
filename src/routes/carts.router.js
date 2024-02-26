import CartManager from "../controllers/cartManager.js";
import { Router } from "express";

const cartManager = new CartManager();
const router = Router();

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json("New Cart created");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;

  try {
    const updatedCart = await cartManager.updateCart(
      Number(cid),
      Number(pid),
      quantity
    );

    res.status(200).json("Product was added correctly");
  } catch (error) {
    if (err.message.includes("Not found Cart")) {
      res.status(404).json(error.message);
    } else if (err.message.includes("Not found Product")) {
      res.status(404).json(error.message);
    } else if (err.message.includes("Exceeds available stock")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const carts = await cartManager.getCarts();

    if (carts === undefined) {
      res.status(200).json([]);
    }

    if (!limit || limit < 1) {
      res.status(200).json(carts);
    } else {
      const limitedCarts = carts.slice(0, limit);
      res.status(206).json(limitedCarts);
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.getCartById(Number(cid));

    res.status(200).json(cart);
  } catch (error) {
    if (err.message.includes("Not found")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartManager.deleteCart(Number(cid));

    res.status(200).json(`Cart with id: ${cid} was removed`);
  } catch (error) {
    if (error.message.includes("Cart does")) {
      res.status(404).json(error.message);
    } else {
      res.status(500).json(error);
    }
  }
});

export default router;
