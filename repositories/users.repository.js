const {Users} = require('../models')

class UsersRepository {

  createUser = async (nickname, hashedPassword) => {
    const password = hashedPassword;

    const createUserData = await Users.create({nickname, password});

    return createUserData
  }

  findUser = async (nickname, password) => {

    try {
      const findUserData = await Users.findOne({
      where : {nickname}});

      return findUserData

    } catch (err) {
      console.log(err)
    }

  
  }
}


module.exports = UsersRepository;