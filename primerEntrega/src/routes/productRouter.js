import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const productRouter = Router();
const productManager = new ProductManager();

productRouter.get('/',async (req,res)=>{
    try {
        const products = await productManager.getProducts();
        let limit = req.query.limit
        if (!limit){
            res.status(200).send({Products : products}) 
        } else if (isNaN(limit)){
            res.status(404).send({ error: 'Para realizar una búsqueda con límite debe ingresar un número.' });
        } else {
            let productsFilter = products.slice(0, limit)
            res.status(200).send({ Products : productsFilter })
        }
    } catch (error) {
        res.status(400).send(error.message);
    }

})

productRouter.get('/:pid',async (req,res)=>{
    try {
        const products = await productManager.getProducts();
        const pid = +req.params.pid;
        const product = products.find(p => p.id === pid);
    
        if(!product){
            res.status(404).send({error: `Producto con id ${pid} no existe.`})
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
})

productRouter.post("/",async (req,res)=>{
        const product = req.body;
        const result = await productManager.addProduct(product);
        res.status(201).json(result);
})

productRouter.put("/:pid",async(req,res)=>{
    try {
        const pid = +req.params.pid;
        const productToUpdate = req.body   
        const product = await productManager.updateProduct(pid,productToUpdate);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).send({error: error});
    }
})

productRouter.delete("/:pid",async(req,res)=>{
    try {
        const pid = +req.params.pid;
        const productToDeleted =  await productManager.deleteProduct(pid);
        res.status(200).send(productToDeleted);
    } catch (error) {
        res.status(404).send({error: error});
    }
})

export default productRouter;