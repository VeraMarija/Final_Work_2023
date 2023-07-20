const UserModel = require("../models/UserModel");

module.exports.getAll = async () => {
  const users = await UserModel.find();
  if(!users){
    throw new Error("No users in database!");
  }
  return users;
};

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