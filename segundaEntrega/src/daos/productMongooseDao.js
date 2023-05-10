import productSchema from '../models/product.model.js';

const SORTVALUE = {
    'asc': 1,
    'desc': -1
};

class ProductMongooseDao{
    async find(){
        const productDocument = await productSchema.find();
        return productDocument.map(product => ({
            id: product._id,
            title: product.title,
            code: product.code,
            price: product.price,
            status: product.status,
            stock: product.stock,
            category: product.category,
            thumbnail: product.thumbnail
        }));
    }

    async paginate(paginate){
        try {
            const { limit = 10, page = 1, sort, query } = paginate;
            const options = {
                limit,
                page,
                sort: sort && { price: SORTVALUE[sort] },
            };

            const filters = {
                status: true,
                filter: query && { filter: { query } }
            };

            const { docs, ...rest } = await productSchema.paginate(filters, options)
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

            rest.prevLink = rest.hasPrevPage ? `http://localhost:8080/api/products?page=${rest.prevPage}&limit=${limit}&sort=${sort}` : ''
            rest.nextLink = rest.hasNextPage ? `http://localhost:8080/api/products?page=${rest.nextPage}&limit=${limit}&sort=${sort}` : ''

            return { payload: products, ...rest };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOne(pid){
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
    }

    async create(data){
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
    }

    async updateOne(pid, data){
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
    }

    async deleteOne(pid){
        return productSchema.deleteOne({ _id: pid });
    }
}




export default ProductMongooseDao;
