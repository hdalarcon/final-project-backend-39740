
import ProductManager from "../manager/productManager.js";

export const getAll_old = async (req,res)=>{
    try {
        const manager =  new ProductManager();

        const products = await manager.find();
        res.send({ status: 'success', products });

    } catch (error) {
        res.status(400).send(error.message);
    }
};


export const getAll = async  (req, res) =>
{
    const { query, limit, page, sort } = req.query;
    const manager = new ProductManager();

    const products = await manager.paginate({ query, limit, page, sort });

    res.send({ status: 'success', products: products.docs, ...products, docs: undefined });
};


export const save = async (req,res)=>{
    try {
        const manager =  new ProductManager();

        const product = await manager.create(req.body);
        res.send({ status: 'success', product, message: 'Product created.' })
    } catch (error) {
        res.status(400).send(error.message);
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
        res.status(404).send({error: error});
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

