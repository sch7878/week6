const UsersRepository = require('../repositories/users.repository.js')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const {Users} = require('../models/')
require("dotenv").config();

class UsersService {
  usersRepository = new UsersRepository();

  createUser = async (nickname, password, confirm) => {

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdAt = new Date();
    createdAt.setHours(createdAt.getHours() + 9);
  
    const updatedAt = new Date();
    updatedAt.setHours(updatedAt.getHours() + 9);

    const checkNickname = /^[a-zA-Z0-9]{3,}$/
    const exitstNickname = await Users.findOne({
      attributes: ['nickname'], 
      where : {nickname:nickname}
    })
    try{
      if (!nickname || !password || !confirm) {
        return {errorMessage : "닉네임, 패스워드, 패스워드 확인 모두 입력해주세요.", status : 412};

      } else if (!checkNickname.test(nickname)) {

        return {errorMessage : "ID 형식이 일치하지 않습니다.", status : 412};
        

      } else if (password !== confirm) {

        return {errorMessage : "패스워드가 일치하지 않습니다.", status : 412};
        
        
      } else if (password.length < 4) {

        return {errorMessage : "패스워드 형식이 일치하지 않습니다", status : 412};
       
      
      } else if (password.search(nickname) !== -1) {

        return {errorMessage : "패스워드에 닉네임이 포함되어 있습니다.", status : 412};


      } else if (exitstNickname) {

        return {errorMessage : "중복된 닉네임입니다.", status : 412};
      

      } else {
        const createUserData = await this.usersRepository.createUser(nickname, hashedPassword);

        return {Message : "회원가입이 완료되었습니다.", status:200};
      };

    } catch (err) {

      console.log(err)
      return {errorMessage : "요청한 데이터 형식이 올바르지 않습니다..", status : 400};
      
    }
  }


loginUserService = async (nickname, password) => {
  
  const loginUserData = await this.usersRepository.findUser(nickname, password);


  try{

  
    if(!loginUserData) {
      
      return {errorMessage : "닉네임 또는 패스워드를 확인해주세요.", status : 400};

    } else if (!bcrypt.compareSync(password, loginUserData.password)) {

      return {errorMessage : "닉네임 또는 패스워드를 확인해주세요.", status : 400};

    } else {

      const token = jwt.sign({userId:loginUserData.userId}, process.env.JWT_KEY)

      return {token : `Bearer ${token}`}
    }
  } catch (err) {

    return {errorMessage : "요청한 데이터 형식이 올바르지 않습니다.d", status:400};
  }

}
}

module.exports = UsersService;