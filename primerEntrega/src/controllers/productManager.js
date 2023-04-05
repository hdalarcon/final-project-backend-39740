import fs from "fs/promises";

class ProductManager {
    idAuto = 1;
    #products;

    constructor() {
        this.#products = [];
        this.path = "./src/db/products.json"
    }

    async readFile(){
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            return data;
        } catch (error) {
            return error;
        }
    }

    async getProducts(){
        try {
            const allProducts = await this.readFile();
            return JSON.parse(allProducts);
        } catch (error) {
            await fs.writeFile(this.path,'[]');
            throw new Error (`El archivo ${this.path} no existía. Se creo con un array vacio.`);
        }
    }

    async getProductById(id){
        try {
            const data = await this.readFile();
            let products = JSON.parse(data);
            const productById = products.find(e => e.id === id)
            if (productById === undefined){
            throw new Error("Not found.");
        } 
            return productById;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProduct(product){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);

            if( !product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnail){
                throw new Error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.');
            }

            if (products.find(e => e.code === product.code)){
                throw new Error(`El producto no puede ser agregado porque ya existe un producto con el mismo código.`);
            }
        
            if (products.length > 0) {
                const lastProduct = products[products.length - 1];
                this.idAuto = lastProduct.id + 1;
            }
            products.push({
                id: this.idAuto,
                ...product
            })
            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            return ({message: `Se ha creado correctamente el producto con id ${this.idAuto}`})
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id,product){
        try {
            let products = await this.getProducts();
            const idx = products.findIndex(e => e.id == id)
            const productFind = await this.getProductById(id);
            if (productFind === undefined){
                throw new Error("No existe un producto con ese id, no se pudo actualizar.")
            } 

            if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
                throw new Error(`No se pudo actualizar el producto con id ${id} porque no se completaron todos los datos necesarios.`)
            }
            products.splice(idx, 1, { id, ...product });

            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            return ({message: `El producto con id ${id} fue actualizado con éxito.`})
        } catch (error) {
            throw new Error({error: error});
        }
    }

    async deleteProduct(id){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);

            const productFind = products.find(e => e.id === id)
            if (productFind === undefined){
                return ({message: "No existe un producto con ese id, no se pudo eliminar."})
            } else {
            const productIndex = products.indexOf(productFind)
                products.splice(productIndex, 1)
                if(products.length === 0){
                    await fs.unlink(this.path, 'utf-8')
                } else{
                    await fs.writeFile(this.path, JSON.stringify(products, null, 2))
                }
                return ({message: `El producto con id ${productFind.id} fue eliminado.`})
            }            
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default ProductManager;
