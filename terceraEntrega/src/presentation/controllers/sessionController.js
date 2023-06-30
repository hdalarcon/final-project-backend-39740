import SessionManager from "../../domain/manager/sessionManager.js";
import loginValidation from "../../domain/validations/session/loginValidation.js";

export const login = async  (req, res, next) =>
{
  try {
    const { email, password } = req.body;

    await loginValidation.parseAsync(req.body);

    const manager = new SessionManager();
    const accessToken = await manager.login(email, password);

    res.cookie('accessToken', accessToken, {
      maxAge: 60*60*1000,
      httpOnly: true
    }).send({ message: 'Login success!' })
  } catch (error) {
    next(error);
  }
};

export const current = async  (req, res, next) =>
{
  try {
    res.status(200).send({ status: 'Success', payload: req.user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) =>
{
  try {
    req.session.destroy( err => {
      if(!err)
      {
        return res.send({ message: 'Logout ok!' });
      }

      res.send({ message: 'Logout error!', body: err })
  });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) =>
{
  try {
    const manager = new SessionManager();
    const user = await manager.signup(req.body);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
  } catch (error) {
    next(error);
  }
};


