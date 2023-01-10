const CommentsRepository = require('../repositories/comments.repository.js')

const error = new Error();
error.status = 400;
const success = {};

class CommentsService {
  commentsRepository = new CommentsRepository()

  createComments = async (userId, postId, nickname, comment) => {

    try {
      const createCommentsData = await this.commentsRepository.createComments(userId, postId, nickname, comment);

      if (!createCommentsData) {

        error.status = 412;
        error.message = {errorMessage : "댓글을 작성해주세요."}
        throw error;
       
      }
      if(userId !== createCommentsData.userId) {

        error.status = 412;
        error.message = {errorMessage : "작성자가 아닙니다."}
        throw error;

      } else {
        
        success.status = 200;
        success.message = {message : "댓글 작성에 성공했습니다."}

        return success
      }
    } catch (error) {
      
      return error || {erroeMessage : "에러가 발생했습니다.", statuse : 400};

    }
    
  }
  findAllComments = async (postId) => {

    try {
      const allComments = await this.commentsRepository.findAllComments(postId);

      allComments.sort((a,b) => {
          return b.createdAt - a.createdAt
      })

      if(!allComments) {

        error.status = 412;
        error.message = {errorMessage : "댓글이 존재하지 않습니다."}
        throw error;
     
      } else {

        success.status = 200;
        success.message = {data : 
        allComments.map(comment => {
          return {
            commentId : comment.commentId,
            nickname : comment.nickname,
            comment : comment.comment,
            createdAt : comment.createdAt,
            updatedAt : comment.updatedAt
          }
        })
        };
        return success;
        

      }
      
    } catch (error) {

      return error || {erroeMessage : "에러가 발생했습니다.", status :400 }
    }
  }
  
  
  updateComments = async (userId, commentId, comment) => {

    try {
      const findComment = await this.commentsRepository.findCommentById(commentId);

      if(!findComment) {

        error.status = 404;
        error.message = {errorMessage : "댓글이 없습니다."}
        throw error;

      } 

      if(userId !== findComment.userId) {

        error.status = 404;
        error.message = {errorMessage : "작성자가 아닙니다."}
        throw error;

      } else if (!comment) {

        error.status = 404;
        error.message = {errorMessage : "댓글을 입력해주세요."}
        throw error;

      }

      else {

        await this.commentsRepository.updateComments(commentId, comment)

        const updateComment = await this.commentsRepository.findCommentById(commentId);

        success.status = 200;
        success.message = {"data" : {
          commentId : updateComment.commentId,
          userId : updateComment.userId,
          nickname : updateComment.nickname,
          comment : updateComment.comment,
          createdAt : updateComment.createdAt,
          updatedAt : updateComment.updatedAt
        }};

        return success;
        
      }
    } catch (error) {
      return error

    }
  }
  deleteComments =async (commentId, userId) => {
 
    try {
      const findComment = await this.commentsRepository.findCommentById(commentId);
      
      if(userId !== findComment.userId) {

        error.status = 412;
        error.message = {errorMessage : "작성자가 아닙니다."}
        throw error;

      } else if (!findComment) {

        error.status = 404;
        error.message = {errorMessage : "댓글이 없습니다."}
        throw error;
        
      } else {

        await this.commentsRepository.deleteComments(commentId);

        success.status = 200;
        success.message = {message : "댓글이 삭제 되었습니다."}

        return success;
      }
    } catch (error) {
      
      return error;
      
    }
  }
}

module.exports = CommentsService