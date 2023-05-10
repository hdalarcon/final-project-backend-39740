import { Router } from "express";
import { getAll, save, getOne, update, deleteOne } from "../controllers/productController.js";

const productRouter = Router();


productRouter.get('/', getAll);
productRouter.get('/:pid', getOne);
productRouter.post("/", save)
productRouter.put("/:pid", update);
productRouter.delete("/:pid", deleteOne);

export default productRouter;