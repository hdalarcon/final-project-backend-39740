
import ProductManager from "../../domain/manager/productManager.js";

export const getAll = async  (req, res) =>
{   
    try {
        const { limit, page, sort } = req.query;

        let query = {}
        if(req.query.category || req.query.status) query = req.query
        const manager = new ProductManager();
        const products = await manager.paginate({ query, limit, page, sort });
        res.send({ status: 'success', products: products.docs, ...products, docs: undefined });
    } catch (error) {
        res.status(400).send({message: 'Error al ingresar el numero de pagina.'});
    }
};


export const save = async (req,res)=>{
    try {
        const manager =  new ProductManager();
        const product = await manager.create(req.body);
        res.send({ status: 'success', product, message: 'Product created.' })
    } catch (error) {
        res.status(400).send({message: 'Error al ingresar el numero de pagina.'});
    }
};

export const getOne = async (req,res)=>{
    try {
        const { pid } = req.params;
        const manager = new ProductManager();
        const product = await manager.getOne(pid);

        res.send({ status: 'success', product });
    } catch (error) {
        res.status(404).send({error: error.message});
    }
};


export const update = async(req,res)=>{
    try {
        const { pid } = req.params;
        const manager = new ProductManager();
        const product = await manager.updateOne(pid,req.body);
        res.send({ status: 'success', product, message: 'Product updated.' });
    } catch (error) {
        res.status(404).send({message: `Error al querer actualizar el producto.`});
    }
};

export const deleteOne = async(req,res)=>{
    try {
        const { pid } = req.params;
        const manager = new ProductManager();
        const product = await manager.deleteOne(pid);
        res.send({ status: 'success', product, message: 'Product deleted.' })
    } catch (error) {
        res.status(404).send({error: error});
    }
};

