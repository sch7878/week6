const UsersRepository = require('../repositories/users.repository.js')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

const error = new Error();
error.status = 400;
const success = {};


class UsersService {
  usersRepository = new UsersRepository();

  createUser = async (nickname, password, confirm) => {
    try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createdAt = new Date();
      createdAt.setHours(createdAt.getHours() + 9);
    
      const updatedAt = new Date();
      updatedAt.setHours(updatedAt.getHours() + 9);

      const checkNickname = /^[a-zA-Z0-9]{3,}$/;

      const exitstNickname = await this.usersRepository.findNickname(nickname);
      

    
      if (!nickname || !password || !confirm) {

        error.status = 412;
        error.message = {errorMessage : "닉네임, 패스워드, 패스워드 확인 모두 입력해주세요."}
        throw error;

      } else if (!checkNickname.test(nickname)) {

        error.status = 412;
        error.message = {errorMessage : "ID 형식이 일치하지 않습니다."}
        throw error;

      } else if (password !== confirm) {

        error.status = 412;
        error.message = {errorMessage : "패스워드가 일치하지 않습니다."}
        throw error;
        
      } else if (password.length < 4) {

        error.status = 412;
        error.message = {errorMessage : "패스워드 형식이 일치하지 않습니다"}
        throw error;

      } else if (password.search(nickname) !== -1) {

        error.status = 412;
        error.message = {errorMessage : "패스워드에 닉네임이 포함되어 있습니다."}
        throw error;

      } else if (exitstNickname) {

        error.status = 412;
        error.message = {errorMessage : "중복된 닉네임입니다."}
        throw error;
      

      } else {
        const createUserData = await this.usersRepository.createUser(nickname, hashedPassword);

        success.message = {message : "회원가입이 완료되었습니다."};
        success.status = 200;
        return success
      };

    } catch (error) {
      
      return error;
      
    }
  }


loginUserService = async (nickname, password) => {
  try{
    
    const loginUserData = await this.usersRepository.findUser(nickname, password);
    

    if(!loginUserData) {

      error.status = 412;
      error.message = {errorMessage : "닉네임 또는 패스워드를 확인해주세요."}
      throw error;
      
    } else if (!bcrypt.compareSync(password, loginUserData.password)) {

      error.status = 412;
      error.message = {errorMessage : "닉네임 또는 패스워드를 확인해주세요."}
      throw error;

    } else {
      const token = jwt.sign({userId:loginUserData.userId}, process.env.JWT_KEY)

      success.status = 200;
      success.message = {token : `Bearer ${token}`}

      return success;
    }
  } catch (error) {

    return error;
  } 
}
}

module.exports = UsersService;