import container from '../../container.js';

class ProductManager{
    constructor(){
        this.productRepository =  container.resolve('ProductRepository');
    }

    async find(){
        return this.productRepository.find();
    }

    async paginate(paginate){
        return this.productRepository.paginate(paginate);
    }


    async create(data){
        const product = await this.productRepository.create(data);
        return product; 
    }

    async getOne(pid){
        return this.productRepository.getOne(pid);
    }

    async updateOne(pid, data){
        return this.productRepository.updateOne(pid, data);
    }

    async deleteOne(pid){
        return this.productRepository.deleteOne(pid);
    }
}

export default ProductManager;