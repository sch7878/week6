const LikesRepository = require('../repositories/likes.repository.js');

class LikesService {
  likesRepository = new LikesRepository();

  setLikes = async(userId, postsId, nickname) => {

    const likedPost = await this.likesRepository.findpost(userId, postsId);

    console.log(likedPost)
  
    try {

      if (likedPost.length === 0) {
        const enrolledLike = await this.likesRepository.createLike(userId, postsId, nickname);
        const PostsLikes = await this.likesRepository.upLikes(postsId);
        
        return {message : "좋아요가 등록되었습니다.", data : enrolledLike}
      } else if (likedPost) {
        const deletedLikes = await this.likesRepository.deleteLikes(userId, postsId);
        const postsLikes = await this.likesRepository.downLikes(postsId);

        return {message : "좋아요가 취소 되었습니다.", data : deletedLikes}
      } 
    } catch (err) {
      console.log(err)
      return {errorMessage : "좋아요에 실패하였습니다..", status : 400}
    }

  
  }
}

module.exports = LikesService