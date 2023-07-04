import dotenv from "dotenv";
dotenv.config();

import { createContainer, asClass, Lifetime } from "awilix";

import UserMongooseRepository from './data/repositories/userMongooseRepository.js';
import RoleMongooseRepository from './data/repositories/roleMongooseRepository.js';
import CartMongooseRepository from './data/repositories/cartMongooseRepository.js';
import ProductMongooseRepository from './data/repositories/productMongooseRepository.js';

const container = createContainer();

if(process.env.DB === 'MongooseAdapter')
{
  container.register('UserRepository', asClass(UserMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('RoleRepository', asClass(RoleMongooseRepository), { lifetime: Lifetime.SINGLETON });
  container.register('CartRepository', asClass(CartMongooseRepository), { lifetime: Lifetime.SINGLETON});
  container.register('ProductRepository', asClass(ProductMongooseRepository), { lifetime: Lifetime.SINGLETON})
}

export default container;