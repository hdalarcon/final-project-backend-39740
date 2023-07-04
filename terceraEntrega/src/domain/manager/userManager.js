import container from '../../container.js'

class UserManager
{
  constructor()
  {
     this.userRepository = container.resolve('UserRepository');
  }

  async paginate(paginate)
  {
    return this.userRepository.paginate(paginate);
  }

  async getOneByEmail(email)
  {
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id)
  {
    return this.userRepository.getOne(id);
  }

  async create(data)
  {
      const user = await this.userRepository.create(data);
      return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    return this.userRepository.updateOne(id, data);
  }

  async deleteOne(id)
  {
    return this.userRepository.deleteOne(id);
  }
}

export default UserManager;
