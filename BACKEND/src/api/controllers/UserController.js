const UserService = require("../services/UserService");
const {
    create,
    replace,
    update,
  } = require('../validation/userValidation');

  module.exports.getAll = async (req, res, next) => {
    try {
      const result = await UserService.getAll();
      return res.status(200).json({users: result});
    } catch (error) {
      return next(error);
    }
  };

module.exports.createUser = async (req, res, next) => {
  try {
    const result = await UserService.createUser(req);
    return res.json({user: result});
  } catch (error) {
    return next(error);
  }
};
