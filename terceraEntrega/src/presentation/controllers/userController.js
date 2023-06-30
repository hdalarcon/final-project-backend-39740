import UserManager from "../../domain/manager/userManager.js";

export const list = async  (req, res, next) =>
{
  try {
    const { limit, page } = req.query;
    const manager = new UserManager();

    const users = await manager.paginate({ limit, page });

    res.send({ status: 'success', users: users.docs, ...users, docs: undefined });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req, res, next) =>
{
  try {
    const { id } = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    res.send({ status: 'success', user });
  } catch (error) {
    next(error);
  }
};

export const save = async (req, res, next) =>
{
  try {
    const manager = new UserManager();
    const user = await manager.create(req.body);
    res.send({ status: 'success', user, message: 'User created.' })
    
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) =>
{
  try {
    const { id } = req.params;

    const manager = new UserManager();
    const result = await manager.updateOne(id, req.body);
  
    res.send({ status: 'success', result, message: 'User updated.' })
  } catch (error) {
    next(error);
  }
};

export const deleteOne = async (req, res, next) =>
{
  try {
    const { id } = req.params;

    const manager = new UserManager();
    await manager.deleteOne(id);
  
    res.send({ status: 'success', message: 'User deleted.' })
  } catch (error) {
    next(error);
  }
};
