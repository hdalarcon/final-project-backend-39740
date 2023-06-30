import UserMongooseDao from "../../data/daos/userMongooseDao.js";

class UserManager
{
  constructor()
  {
     this.userDao = new UserMongooseDao();
  }

  async paginate(paginate)
  {
    return this.userDao.paginate(paginate);
  }

  async getOneByEmail(email)
  {
    return this.userDao.getOneByEmail(email);
  }

  async getOne(id)
  {
    return this.userDao.getOne(id);
  }

  async create(data)
  {
      const user = await this.userDao.create(data);
      return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    return this.userDao.updateOne(id, data);
  }

  async deleteOne(id)
  {
    return this.userDao.deleteOne(id);
  }
}

export default UserManager;
