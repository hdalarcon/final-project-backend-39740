import { Router } from "express";
import CartManager from "../controllers/cartManager.js";
import ProductManager from "../controllers/productManager.js";

const productManager = new ProductManager();

const cartRouter = Router();    
const cartManager = new CartManager();

cartRouter.get("/:cid",async (req, res)=>{
    const cartId = +req.params.cid
    const isExits = await cartManager.getCartById(cartId);

    if(!isExits){
        res.status(404).send({error: `No existe el carrito con id ${cartId}`});
    }
    const result = await cartManager.getProductsCartById(cartId);
    res.status(200).json(result);

})

cartRouter.post("/",async (req, res)=>{
    try {
        const cart = req.body;
        const cartAdd = await cartManager.addCart(cart);
        const result = cartAdd;
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
        const cartId = +req.params.cid
        const productId = +req.params.pid

        const existProduct = await productManager.getProductById(productId);

        if(!existProduct){
            res.status(404).send(`No se ha encontrado el id ${productId} en la lista de productos.`);
        }  
        const result = await cartManager.addProductToCartById(cartId, productId)

        res.status(201).send(result);
})


export default cartRouter;
