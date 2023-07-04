import container from "../../container.js";

class CartManager{
    constructor(){
        this.cartRepository = container.resolve('CartRepository');
    }

    async getOne(){
        const cart = await this.cartRepository.getAll();
        return cart;
    }

    async getOne(cid){
        const cart = await this.cartRepository.getOne(cid);
        return cart;
    }

    async create(data){
        const cart = await this.cartRepository.create(data);
        return cart;
    }

    async updateOne(cid, pid){
        return this.cartRepository.updateOne(cid, pid);
    }

    async deleteItem(cid, pid) {
        try {
            return this.cartRepository.deleteItem(cid, pid);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cid, pid) {
        try {
            return this.cartRepository.deleteProduct(cid, pid);
        } catch (error) {
            throw error;
        }
    };

    async delete(id) {
        try {
            return this.cartRepository.delete(id);
        } catch (error) {
            throw error;
        }
    };

    async updateProducts(item, cid) {
        try {
            return this.cartRepository.updateProducts(item, cid);
        } catch (error) {
            throw error;
        }
    }

    async updateProductByCartId(item, cid, pid) {
        try {
            return this.cartRepository.updateProductByCartId(item, cid, pid);
        } catch (error) {
            throw error;
        }
    }
}

export default CartManager;