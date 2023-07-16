const UserModel = require("../models/UserModel");


module.exports.createUser = async (req) => {

    const { email, password, firstName, lastName } = req.body;
  
    // const title = req.body.title;
    const user = new UserModel({
      email,
      password,
      firstName,
      lastName
    });
  
    try {
      await user.save();
    } catch (err) {
      console.log(err);
    
      return {error: err.message};
    }
  
    return { user: user };
  };