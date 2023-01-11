const {Likes, Posts} = require('../models');

class LikesRepository {

  findpostById = async(postId) => {
    const post = await Posts.findAll({postId});
    
    return post;
  }
  
  findpost = async(userId, postId) => {

    const allLikes = await Likes.findAll(
      {where : {userId, postId}});
    
    return allLikes;
  };

  
  createLike = async (userId, postId, nickname) => {
    const title = await Posts.findOne({where : {postId}})
    const setLikes = await Likes.create({postId, userId, nickname, title:title.title})
  
    return {setLikes : true};
  }

  upPostsLikes = async (postId) => {
    const post = await Posts.findOne({where : {postId}})
    const plus = await Posts.update(
      {likes : post.likes +1},
      {where: {postId}})
    return plus; 
  }

  upLikes = async (postId) => {
    const like = await Likes.findAll({where : {postId}})
    const plus = await Likes.update(
      {likes : like.likes +1},
      {where : {postId}}
      )
    return plus;
  };

  deleteLikes = async (userId, postId) => {
    const delLikes = await Likes.destroy({where : {userId, postId}});

    return {delLikes : true};
  }
  
  downPostsLikes = async (postId) => {
    const post = await Posts.findOne({where : {postId}})
    const minus = await Posts.update(
      {likes : post.likes -1},
      {where: {postId}})
    return minus
  }

  downLikes = async (postId) => {
    const like = await Likes.findAll({where : {postId}})
    const minus = await Likes.update(
      {likes : like.likes -1},
      {where : {postId}}
      )
    return minus;
  };

  getAllLikes = async (userId) => {
    const likes = await Likes.findAll ({
      where : {userId},
      include : [{model:Posts, attributes:['likes']}],
       
    },
      
      {order: [['createdAt', 'desc']]}
      )



    return likes;
  }

}


module.exports = LikesRepository