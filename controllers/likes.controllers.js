const LikesService = require('../services/likes.service.js');

class LikesControllers {
  likesService = new LikesService();

  setLikes = async (req, res, next) => {
    const {postsId} = req.params;
    const {userId, nickname} = res.locals.user;

    console.log(postsId)


    const likes = await this.likesService.setLikes(userId, postsId, nickname);
    
    
    res.status(likes.status || 400).json(likes.message);
    

  }
  getAllLikes = async (req, res, next) => {
    const {userId} = res.locals.user;

    const listLikes = await this.likesService.getAllLikes(userId);

    res.status(listLikes.status || 400).json(listLikes.message);
  }
}

module.exports = LikesControllers;