const {Users} = require('../models')

class UsersRepository {

  findNickname = async (nickname) => {
    const extist = await Users.findOne({
      where : {nickname}
    });

    return extist
    
  }

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