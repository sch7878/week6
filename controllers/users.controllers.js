const UsersService = require('../services/users.service.js')

class UsersController {
  usersService = new UsersService();

  signupUsers = async (req, res, next) => {
    const {nickname, password, confirm} = req.body

    const signupUser = await this.usersService.createUser(nickname, password, confirm);

    try {

    
    if(signupUser.errorMessage) {

      res.status(signupUser.status).json({
        "errorMessage" : signupUser.errorMessage
      })
      return

    } 
  
      res.status(200).json({
        success : true,
        message : "회원가입에 성공했습니다."
      })
      return;

    } catch (err) {
      console.log(err)
    }

    
  };

  loginUsers = async (req, res, next) => {
    const {nickname, password} = req.body;

    const longinUser = await this.usersService.loginUserService(nickname, password);
      
      if(longinUser.errorMessage) {
        
        res.status(longinUser.status).json({
          errorMessage : longinUser.errorMessage
        })
        return;
      } else {
        res.cookie("Authorization", longinUser.token)

        res.status(200).json({
          success : true,
          Message : longinUser.token
        })
        return;
      }
    
    


  }

}

module.exports = UsersController;
// singupUsers
// loginUsers