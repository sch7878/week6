const { use } = require('../middleware/auth_middleware.js');
const CommentsService = require('../services/comments.service.js')

class CommentControllers {
  commentsService = new CommentsService();

  createComments = async (req, res, next) => {
    const {comment} = req.body;
    const {postId} = req.params;
    const {userId, nickname} = res.locals.user;

    const createdComment = await this.commentsService.createComments(userId, postId, nickname, comment);
    
    res.status(createdComment.status || 400).json(createdComment.message)


  }

  getAllComments = async (req, res, next) => {
    const {postId} = req.params;

    const comments = await this.commentsService.findAllComments(postId);

    res.status(comments.status || 400).json(comments.message)
  }

  updateComments = async (req, res, next) => {
    const {commentId} = req.params;
    const {comment} = req.body;
    const {userId} = res.locals.user;

    const updateCommentsService = await this.commentsService.updateComments(userId, commentId, comment);

    res.status(updateCommentsService.status || 400).json(updateCommentsService.message)


  }
  deleteComments = async (req, res, next) => {
    const {commentId} = req.params;
    const {userId} = res.locals.user;

    const deleteComment = await this.commentsService.deleteComments(commentId, userId)

    res.status(deleteComment.status || 400).json(deleteComment.message)
  }
}

module.exports = CommentControllers