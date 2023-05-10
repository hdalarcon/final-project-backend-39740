import CartMongooseDao from "../daos/cartMongooseDao.js";

class CartManager{
    constructor(){
        this.cartDao = new CartMongooseDao();
    }

    async getOne(){
        const cart = await this.cartDao.getAll();
        return cart;
    }

    async getOne(cid){
        const cart = await this.cartDao.getOne(cid);
        return cart;
    }

    async create(data){
        const cart = await this.cartDao.create(data);
        return cart;
    }

    async updateOne(cid, pid){
        return this.cartDao.updateOne(cid, pid);
    }

    async deleteItem(cid, pid) {
        try {
            return this.cartDao.deleteItem(cid, pid);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            return this.cartDao.deleteProduct(cid, pid);
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            return this.cartDao.delete(id);
        } catch (error) {
            throw error;
        }
    };

    async updateProducts(item, cid) {
        try {
            return this.cartDao.updateProducts(item, cid);
        } catch (error) {
            throw error;
        }
    }

    async updateProductByCartId(item, cid, pid) {
        try {
            return this.cartDao.updateProductByCartId(item, cid, pid);
        } catch (error) {
            throw error;
        }
    }
}

export default CartManager;