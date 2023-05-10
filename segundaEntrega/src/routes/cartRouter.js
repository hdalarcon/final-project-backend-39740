import { Router } from "express";
import { save, getOne, update, getAll, deleteProduct, updateProductsByCartId, updateProductByCartId, deleteCart } from "../controllers/cartController.js";

const cartRouter = Router();    

cartRouter.get("/", getAll);
cartRouter.get("/:cid", getOne);
cartRouter.post("/", save);
cartRouter.post("/:cid/product/:pid",update);
cartRouter.delete("/:cid/products/:pid", deleteProduct);
cartRouter.delete("/:cid", deleteCart);
cartRouter.put("/:cid", updateProductsByCartId);
cartRouter.put("/:cid/product/:pid", updateProductByCartId);

export default cartRouter;
