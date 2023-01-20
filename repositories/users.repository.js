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

    try {

      await Users.create({nickname, password});

      return;

    } catch (error) {

      return error;
    }


  }

  findUser = async (nickname, password) => {

      const findUserData = await Users.findOne({
      where : {nickname}});

      return findUserData
  
  }
}


module.exports = UsersRepository;