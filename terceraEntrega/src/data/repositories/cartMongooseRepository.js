import cartSchema from '../models/cart.model.js'

class CartMongooseRepository{

    async getOne(cid){
        try {
            
        const cartDocument = await cartSchema.findOne({_id: cid}).populate('products._id');
        return{
            id: cartDocument._id,
            products: cartDocument.products.map(item => {
                const { _id: product } = item;
                return {
                    id: product._id,
                    quantity: item.quantity,
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    status: product.status,
                    stock: product.stock,
                    category: product.category,
                    thumbnail: product.thumbnail,
                }
            })
        };
        } catch (error) {
            throw new Error(`Error al buscar el carrito con id ${cid}, verifique si es correcto.`);
        }
    }

    async create(data) {
        try {
            const cartDocument = await cartSchema.create(data);
            return {
                id: cartDocument._id,
                products: cartDocument.products.map(product => {
                    return {
                        id: product._id,
                        quantity: product.quantity
                    }
                })
            }
        } catch (error) {
            throw new Error(`Error al querer generar el carrito.`);
        }
    };

    async updateOne(cid, pid) {
        try {
            const updateProducts = await cartSchema.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $inc: { 'products.$.quantity': 1 } },
                { new: true }
            ).populate('products');

            if (!updateProducts) {
                await cartSchema.updateOne(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: 1 } } }
                );
            };
            const cartDocument = await cartSchema.findById(cid);

            if(!cartDocument)
            {
                return `Error al querer actualizar el carrito con id ${cid}`
            }

            return {
                id: cartDocument._id,
                products: cartDocument.products.map(product => {
                    return {
                        id: product._id,
                        quantity: product.quantity
                    }
                })
            }
        } catch (error) {
            throw new Error(`Error al querer actualizar el carrito con id ${cid}`);
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const document = await cartSchema.findByIdAndUpdate(
                { _id: cid },
                { $pull: { products: { _id: pid } } },
                { new: true }
            )

            return {
                id: document._id
            };
        } catch (error) {
            throw new Error(`Error al querer eliminar el producto id ${pid} del carrito con id ${cid}.`);
        }
    }

    async delete(id) {
        try {
            const document = await cartSchema.findOneAndUpdate(
                { _id: id },
                { $unset: { products: true } },
                { new: true }
            );
            return {
                id: document._id
            }
        } catch (error) {
            throw new Error(`Error al querer eliminar los productos del carrito con id ${id}.`);
        }
    }

    async updateProducts(item, cid) {
        try {
            const document = await cartSchema.findOneAndUpdate(
                { _id: cid },
                { $set: { products: item } },
                { new: true }
            );
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            throw new Error(`Error al actualizar el carrito con id ${cid}.`);
        }
    };

    async updateProductByCartId(item, cid, pid) {
        try {
            const document = await cartSchema.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $set: { 'products.$.quantity': item.quantity } },
                { new: true }
            );
            return {
                id: document._id,
                products: document.products.map(item => {
                    return {
                        id: item._id,
                        quantity: item.quantity
                    }
                })
            }
        } catch (error) {
            throw new Error(`Error al querer actualizar el carrito con id ${cid}`);
        }
    };
}

export default CartMongooseRepository;