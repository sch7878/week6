const UsersService = require('../services/users.service.js')

class UsersController {
  usersService = new UsersService();

  signupUsers = async (req, res, next) => {
    const {nickname, password, confirm} = req.body

    const signupUser = await this.usersService.createUser(nickname, password, confirm);
    
    
    res.status(signupUser.status || 400).json(signupUser.message)
  
    
  };

  loginUsers = async (req, res, next) => {
    const {nickname, password} = req.body;

    const longinUser = await this.usersService.loginUserService(nickname, password);

    
    res.cookie("Authorization", longinUser.message.token)
    res.status(longinUser.status || 400).json(longinUser.message)
      
  
      
  }

}

module.exports = UsersController;
