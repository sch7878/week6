const {Likes, Posts} = require('../models');

class LikesRepository {
  
  findpost = async(userId, postId) => {

    const allLikes = await Likes.findAll(
      {where : {userId, postId}});
    
    return allLikes;
  };

  
  createLike = async (userId, postId, nickname) => {
    const likes = 1;
    const title = await Posts.findOne({where : {postId}})
    const setLikes = await Likes.create({postId, userId, nickname, title:title.title, likes})
  
    return {setLikes : true};
  }

  upLikes = async (postId) => {
    const post = await Posts.findOne({where : {postId}})
    const plus = await Posts.update(
      {lieks : post.likes +1},
      {where: {postId}})
    return plus; 
  }
  deleteLikes = async (userId, postId) => {
    const delLikes = await Likes.destroy({where : {userId, postId}});

    return {delLikes : true};
  }
  
  downLikes = async (postId) => {
    const post = await Posts.findOne({where : {postId}})
    const minus = await Posts.update(
      {lieks : post.likes -1},
      {where: {postId}})
    return minus
  }

}

module.exports = LikesRepository