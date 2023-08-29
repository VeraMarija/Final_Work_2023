const { BulkWriteResult } = require('mongodb');
const authService = require('../services/AuthService');



exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req); 
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req); 
    console.log('----', result);
    return res.status(200).json(result);

  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req); 
    console.log('result', result);
    return res.status(200).json(result);

  } catch (error) {
    return next(error);
  }
};


exports.resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req); 
    return res.status(200).json(result);

  } catch (error) {
    return next(error);
  }
};



