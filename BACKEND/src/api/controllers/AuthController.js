const authService = require('../services/AuthService');



exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req); 
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req); 
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

