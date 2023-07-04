import productSchema from '../models/product.model.js';

const SORTVALUE = {
    'asc': 1,
    'desc': -1
};

class ProductMongooseRepository{

    async paginate(paginate){
        try {
            const { limit = 10, page = 1, sort, query } = paginate;
            const options = {
                limit,
                page,
                sort: sort && { price: SORTVALUE[sort] },
            };

            const { docs, ...rest } = await productSchema.paginate(query, options)
            const products = docs.map(item => ({
                id: item._id,
                title: item.title,
                description: item.description,
                code: item.code,
                price: item.price,
                status: item.status,
                stock: item.stock,
                category: item.category,
                thumbnail: item.thumbnail
            }));
            if(page > rest.totalPages || page < 0 || isNaN(page) )
            { return console.log({ message: `Error al ingresar el numero de pagina.` });}

            rest.prevLink = rest.hasPrevPage ? `http://localhost:8080/api/products?page=${rest.prevPage}&limit=${limit}&sort=${sort}` : ''
            rest.nextLink = rest.hasNextPage ? `http://localhost:8080/api/products?page=${rest.nextPage}&limit=${limit}&sort=${sort}` : ''

            return { payload: products, ...rest };
        } catch (error) {
            throw new Error('Error al realizar la paginacion.');
        }
    }

    async getOne(pid){
        try {
            const productDocument = await productSchema.findOne({_id: pid});
   
            return {
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnail: productDocument.thumbnail
            }
        } catch (error) {
            throw new Error(`Error al buscar el producto con id ${pid}`)
        }
    }

    async create(data){
        try {
            const productDocument = await productSchema.create(data);
            return {
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnail: productDocument.thumbnail
            }
        } catch (error) {
            throw new Error(`Error al crear el producto.`);
        }
    }

    async updateOne(pid, data){
        try {
            const productDocument = await productSchema.findOneAndUpdate({ _id: pid }, data, { new: true});
            return {
                id: productDocument._id,
                title: productDocument.title,
                description: productDocument.description,
                code: productDocument.code,
                price: productDocument.price,
                status: productDocument.status,
                stock: productDocument.stock,
                category: productDocument.category,
                thumbnail: productDocument.thumbnail
            }
        } catch (error) {
            throw new Error(`Error al querer actualizar el producto con id ${pid}.`);
        }
    }

    async deleteOne(pid){
        return productSchema.deleteOne({ _id: pid });
    }
}




export default ProductMongooseRepository;
