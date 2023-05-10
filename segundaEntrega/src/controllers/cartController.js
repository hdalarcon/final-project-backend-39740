import CartManager from "../manager/cartManager.js";

export const getOne = async (req,res)=>{
    try {
        const { cid } = req.params;
        const manager = new CartManager();
        const cart = await manager.getOne(cid);
        res.send({ status: 'success', cart });
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

export const save = async (req,res)=>{
    try {
        const manager =  new CartManager();
        const cart = await manager.create(req.body);
        res.send({ status: 'success', cart, message: 'Cart created.' })
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const update = async(req,res)=>{
    try {
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const cart = await manager.updateOne(cid, pid);
        res.send({ status: 'success', cart, message: 'Cart updated.' });
    } catch (error) {
        res.status(404).send({error: error});
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const result = await manager.deleteProduct(cid, pid);
        res.send({status: 'success',msg:'Item deleted successfully',result});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteOne = async(req,res)=>{
    try {
        const { id } = req.params;
        const manager = new CartManager();
        const cart = await manager.deleteOne(id);
        res.send({ status: 'success', cart, message: 'Product deleted.' })
    } catch (error) {
        res.status(404).send({error: error});
    }
};

export const deleteCart = async (req , res) => {
    try {
        const { cid } = req.params;
        const manager = new CartManager();
        const result = await manager.delete(cid);
        res.send({status: 'success',msg:'Cart deleted',result});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const updateProductsByCartId = async (req, res) => {
    try {
        const { body } = req;
        const { cid } = req.params;
        const manager = new CartManager();
        const result = await manager.updateProducts(body, cid);
        res.send({status: 'sucess',msg:'Cart updated',result});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const updateProductByCartId = async (req, res) => {
    try {
        const { body } = req;
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const result = await manager.updateProductByCartId(body, cid, pid);
        res.send({status: 'success',msg:'Product updated',result});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

