const {Comments} = require('../models')

class CommentsRepository {

  createComments = async (userId, postId, nickname, comment) => {
    
    const createCommentsData = await Comments.create(
      {userId, postId, nickname, comment}, 
      {where : {postId}})

    return createCommentsData;
  }

  findAllComments = async (postId) => {

    const findAllCommentsData = await Comments.findAll({postId});
    
    return findAllCommentsData;
  }

  findCommentById = async (commentId) => {
    
    const findCommentData = await Comments.findByPk(commentId);

    return findCommentData;
  }


  updateComments = async (commentId, comment) => {

      const updateCommentsData = await Comments.update(
        {comment},
        {where: {commentId}
      });

      return updateCommentsData;
  };

  deleteComments = async (commentId) => {

    const deleteComment = await Comments.destroy(
      {where : {commentId}})
    return deleteComment;
  }

}

module.exports = CommentsRepository