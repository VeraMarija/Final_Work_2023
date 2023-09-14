const UserService = require("../services/UserService");
const { create, replace, update } = require("../validation/userValidation");

module.exports.getAll = async (req, res, next) => {
  try {
    const result = await UserService.getAll();
    return res.status(200).json({ users: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const result = await UserService.createUser(req);
    return res.status(200).json({ createdUser: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  console.log('update useraaaaaaaaaaaaaaaaaaaaaaa');
  try {
    const result = await UserService.updateUser(req);
    return res.status(200).json({ updatedUser: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const result = await UserService.deleteUser(req);
    return res.status(200).json({ message: result });
  } catch (error) {
    return next(error);
  }
};

module.exports.getByUserId = async (req, res, next) => {
  try {
    const result = await UserService.getByUserId(req.params.userId);
    return res.status(200).json({ loadedUser: result });
  } catch (error) {
    return next(error);
  }
};
