const LikesService = require('../services/likes.service.js');

class LikesControllers {
  likesService = new LikesService();

  setLikes = async (req, res, next) => {
    const {postsId} = req.params;
    const {userId, nickname} = res.locals.user;


    const likes = await this.likesService.setLikes(userId, postsId, nickname);


    try {
     if (likes.errorMessage) {
      res.status(likes.status).json({
        errorMessage : likes.errorMessage
      })
      return;
    } else if (likes.message) {
      res.status(200).json({message : likes.message})
    } 
    } catch (err) {
      console.log(err)
      res.status(400).json({
        errorMessage : "좋아요에 실패하였습니다."
      })
    }
    

  }
  getAllLikes
}

module.exports = LikesControllers;