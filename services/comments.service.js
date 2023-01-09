const CommentsRepository = require('../repositories/comments.repository.js')

class CommentsService {
  commentsRepository = new CommentsRepository()

  createComments = async (userId, postId, nickname, comment) => {
    
    console.log("dhdP"+userId)

    const createCommentsData = await this.commentsRepository.createComments(userId, postId, nickname, comment);

    console.log("dhdP"+userId + createCommentsData.userId)

    
    try {
      if (!createCommentsData) {

        return {errorMessage : "댓글을 작성해주세요.", status: 400};

      }
      if(userId !== createCommentsData.userId) {

        return {errorMessage : "작성자가 아닙니다.", status: 400};

      } else {
        
        return {
          commentId : createCommentsData.commentId,
          userId : createCommentsData.userId,
          nickname : createCommentsData.nickname,
          comment : createCommentsData.comment,
          createdAt : createCommentsData.createdAt,
          updatedAt : createCommentsData.updatedAt
        };
      }
    } catch (err) {
      console.log(err);
      return {errorMessage : "요청한 데이터의 형식이 올바르지 않습니다.", status : 400};

    }
    
  }
  findAllComments = async (postId) => {
    const allComments = await this.commentsRepository.findAllComments(postId);

    allComments.sort((a,b) => {
      return b.createdAt - a.createdAt
    })

    try {
      if(!allComments) {

        return {errorMessage : "댓글이 존재하지 않습니다.", status:400};
     
      } else {

        return allComments.map(comment => {
        return {
          commentId : allComments.commentId,
          nickname : allComments.nickname,
          comment : allComments.comment,
          createdAt : allComments.createdAt,
          updatedAt : allComments.updatedAt
        }
      });

      }
      
    } catch (err) {

      return {errorMessage : "댓글 조회에 실패하였습니다.", status:400}
    }
  }
  
  
  updateComments = async (userId, commentId, comment) => {

    const findComment = await this.commentsRepository.findCommentById(commentId);


    try {

      if(!findComment) {

        return {errorMessage : "댓글이 없습니다.", status: 400};
      } 

      if(userId !== findComment.userId) {

        return {errorMessage : "작성자가 아닙니다.", status: 400};

      } else if (!comment) {

        return {errorMessage : "댓글을 입력해주세요.", status: 400};

      }

      else {

        await this.commentsRepository.updateComments(commentId, comment)

        const updateComment = await this.commentsRepository.findCommentById(commentId);

        return {
          commentId : updateComment.commentId,
          userId : updateComment.userId,
          nickname : updateComment.nickname,
          comment : updateComment.comment,
          createdAt : updateComment.createdAt,
          updatedAt : updateComment.updatedAt
        }
        
      }
    } catch (err) {
      console.log(err)

      return {errorMessage : "형식이 올바르지 않습니다.", status:400};

    }
  }
  deleteComments =async (commentId, userId) => {
 
    const findComment = await this.commentsRepository.findCommentById(commentId);
   
    
    try {
      if(userId !== findComment.userId) {

        return {errorMessage : "작성자가 아닙니다.", status: 400};

      } else if (!findComment) {

        return {errorMessage : "댓글이 없습니다.", status: 400};
      } else {

        await this.commentsRepository.deleteComments(commentId);


        return {message : "댓글이 삭제 되었습니다."};
      }
    } catch (err) {
      console.log(err)

      return {errorMessage : "요청한 데이터의 형식이 올바르지 않습니다.", status : 400};
      
    }
  }
}

module.exports = CommentsService