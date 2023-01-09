const { use } = require('../middleware/auth_middleware.js');
const CommentsService = require('../services/comments.service.js')

class CommentControllers {
  commentsService = new CommentsService();

  createComments = async (req, res, next) => {
    const {comment} = req.body;
    const {postId} = req.params;
    const {userId, nickname} = res.locals.user;

    const createdComment = await this.commentsService.createComments(userId, postId, nickname, comment);
    
    try{
      if(createdComment.errorMessage) {
        res.status(createdComment.status).json({
          "errorMessage" : createdComment.errorMessage
        });
        return;
      } else {
        res.status(200).json({
          success : true,
          Message : "댓글 작성이 완료되었습니다."
        });
        return;
      }

    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage : "댓글 작성에 실패하였습니다."
      });
      return;
    }


  }
  getAllComments = async (req, res, next) => {
    const {postId} = req.params;

    const comments = await this.commentsService.findAllComments(postId);

    try {
      if(comments.errorMessage) {
        res.status(comments.status).json({
          "errorMessage" : comments.errorMessage
        });
        return;
      } else {

        res.status(200).json({data:comments});
        return;
      }

    } catch (err) {
      console.log(err)
      res.status(400).json({
        errorMessage : "댓글 조회에 실패하였습니다."
      })
    }
  }
  updateComments = async (req, res, next) => {
    const {commentId} = req.params;
    const {comment} = req.body;
    const {userId} = res.locals.user;

    const updateCommentsService = await this.commentsService.updateComments(userId, commentId, comment);

    try { 
      if(updateCommentsService.errorMessage) {

        res.status(updateCommentsService.status).json({
          "errorMessage" : updateCommentsService.errorMessage
        });
        return;

      } else {

        res.status(200).json({message:"댓글 수정에 성공하였습니다."});
        return;

      }

    } catch (err) {
      console.log(err)

      res.status(400).json({
        errorMessage : "댓글 수정에 실패하였습니다."
      })

    }


  }
  deleteComments = async (req, res, next) => {
    const {commentId} = req.params;
    const {userId} = res.locals.user;

    const deleteComment = await this.commentsService.deleteComments(commentId, userId)

    try {
      if(deleteComment.errorMessage) {

        res.status(deleteComment.status).json({
          "errorMessage" : deleteComment.errorMessage
        })
        return;

      }
      else {

        res.status(200).json({message:deleteComment.message})
        return;

      }
    } catch (err) {

      console.log(err)
      res.status(400).json({
        errorMessage : "댓글 삭제에 실패하였습니다."
      })
    }
  }
}

module.exports = CommentControllers