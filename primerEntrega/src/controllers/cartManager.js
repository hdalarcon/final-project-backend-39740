import fs from "fs/promises";


class CartManager{
    idAuto = 1;
    #carts;
    constructor(){
        this.#carts = [];
        this.path = "./src/db/carts.json"
    }

    async readFile(){
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return data;
        } catch (error) {
            throw new Error (error);
        }
    }
    
    async getCarts() {
        try {
            const data = await this.readFile();
            const result = await JSON.parse(data);
            return result;
        } catch (error) {
            throw new Error (error);
        }
    }

    async getCartById (id){
        try {
            const data = await this.readFile()
            let catrs = JSON.parse(data);
            const cartById = catrs.find(p => p.id == id)
            return cartById
        } catch (error) {
            throw new Error (error);
        }
    }

    async getProductsCartById (id){
        try {
            const data = await this.readFile()
            let catrs = JSON.parse(data);
            const cartById = catrs.find(p => p.id == id)
            return cartById.products
        } catch (error) {
            throw new Error (error);
        }
    }

    async addCart(cart) {
        try {
            const data = await this.getCarts();
            if (data.length > 0) {
                const lastcart = data[data.length - 1];
                this.idAuto = lastcart.id + 1;
            }
            if(cart.products === undefined){
                data.push({
                    id: this.idAuto,
                    products: [],
                });
            }else{
                data.push({
                    id: this.idAuto,
                    ...cart,
                });
            }
            await fs.writeFile(this.path, JSON.stringify(data, null, 2))
            return await this.getCartById(this.idAuto);
        } catch (error) {
            throw new Error (error);
        }
    }

    async addProductToCartById(cid, pid) {
        try {
            const data = await this.getCarts();
            const cart = data.find(item => item.id === cid);
            if (!cart) throw new Error('El id de carrito no existe');

            const product = cart.products.find(item => item.id === pid);
            product ? product.quantity += 1 : cart.products = [...cart.products, { id: pid, quantity: 1 }];

            await fs.writeFile(this.path, JSON.stringify(data, null, 2))
            return { message: `El producto id ${pid} se a agregado correctamente al carrito` };
        } catch (error) {
            throw new Error (error);
        }
    }

}

export default CartManager;