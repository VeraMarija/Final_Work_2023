const UserService = require("../services/UserService");
const {
    create,
    replace,
    update,
  } = require('../validation/userValidation');

module.exports.createUser = async (req, res, next) => {
  try {
    const result = await UserService.createUser(req);
    res.json({result});
  } catch (error) {
    next(error);
  }
};
