const LikesRepository = require('../repositories/likes.repository.js');

const error = new Error();
error.status = 400;
const success = {};

class LikesService {
  likesRepository = new LikesRepository();

  setLikes = async(userId, postsId, nickname) => {
    
    try {
      const findPost = await this.likesRepository.findpostById(postsId);
      const likedPost = await this.likesRepository.findpost(userId, postsId);

      
      if(!findPost) {

        error.status = 404;
        error.message = {errorMessage : "게시글이 존재하지 않습니다."}
        throw error;
      } else if (likedPost.length === 0) {
        const enrolledLike = await this.likesRepository.createLike(userId, postsId, nickname);
        const PostsLikes = await this.likesRepository.upPostsLikes(postsId);
        const LikeLikes = await this.likesRepository.upLikes(postsId);

        success.status = 200;
        success.message = {message : "좋아요가 등록되었습니다."}

        return success 

      } else if (likedPost) {
        const deletedLikes = await this.likesRepository.deleteLikes(userId, postsId);
        const postsLikes = await this.likesRepository.downPostsLikes(postsId);
        const LikeLikes = await this.likesRepository.downLikes(postsId);

        success.status = 200;
        success.message = {message : "좋아요가 취소되었습니다."}

        return success
        
      } else {

        error.status = 400;
        error.message = error.message
        throw error;

      }
    } catch (error) {
      
      return error;
    }

  }

  getAllLikes = async (userId) => {

    try {
      const likes = await this.likesRepository.getAllLikes(userId);

      likes.sort((a,b) => {
        return b.createdAt - a.createdAt
      })

      if(!likes) {

        error.status = 404;
        error.message = {errorMessage : "좋아요 글이 존재하지 않습니다."}
        throw error;
      } else {

        success.status = 200;
        success.message = { "data" :
          likes.map(like => {
            return {
              postId : like.postId,
              nickname : like.nickname,
              title : like.title,
              createdAt : like.createdAt,
              updatedAt : like.updatedAt,
              likes : like.likes
              }
          })
        }

        return success;
      }

    } catch (error) {

      return error;

    }

  }
}

module.exports = LikesService