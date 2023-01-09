const PostsService = require('../services/posts.service.js')

class PostsControllers {
  postsService = new PostsService();

  getAllPosts = async(req, res, next) => {
    const posts = await this.postsService.findAllPosts();


    try {
      if(posts.errorMessage) {
      res.status(posts.status).json({
        "errorMessage" : posts.errorMessage
      })
      return;
    }

    res.status(200).json({data:posts})

    } catch (err) {
      res.status(400).json({
        errorMessage : "게시글 조회에 실패하였습니다."
      })
    }
    
  };

  createPost = async (req, res, next) => {
    const {title, content} = req.body;
    const {userId, nickname} = res.locals.user;
    const likes = 0;

    const createPost = await this.postsService.createPost(title, content, userId, nickname, likes)

    try {

      if(createPost.errorMessage) {
        res.status(createPost.status).json({
          "errorMessage" : createPost.errorMessage
        })
        return;
      } else {
        res.status(201).json({
          success:true,
          message : "게시물 작성이 완료되었습니다."
        });
        return;

      }

    } catch (err) {
      console.log(err)
      res.status(400).json({
        errorMessage : "게시글 작성에 실패하였습니다."
      })

    }

    
  
  }
  

  getOnePost = async(req, res, next) => {
    const {postId} = req.params;

    const post = await this.postsService.findOnepost(postId);

    try {
      if(post.errorMessage) {
        res.status(post.status).json({
          "errorMessage" : post.errorMessage
        })
        return;
      } else {

        res.status(200).json({data:post});
        return;
      }

    } catch (err) {
      console.log(err)
      res.status(400).json({
        errorMessage : "게시글 조회에 실패하였습니다."
      })


    }
   
  };

  updatePost = async(req, res, next) => {
    const {postId} = req.params;
    const {title, content} = req.body;
    const {userId} = res.locals.user;

    const updatePostService = await this.postsService.updatePost(postId, title, content, userId);
    
    try { 
      if(updatePostService.errorMessage) {
        res.status(updatePostService.status).json({
          "errorMessage" : updatePostService.errorMessage
        })
        return;

      } else {

        res.status(200).json({message : "게시글 수정에 성공했습니다."})
        return;

      }

    } catch (err) {

      console.log(err)

      res.status(400).json({
        errorMessage : "게시글 수정에 실패하였습니다."
      })

    }
  }

  deletePost = async (req, res, next) => {
    const {postId} = req.params;
    const {userId} = res.locals.user;

    const deletePost = await this.postsService.deletePostService(postId, userId);

    try {
      if  (deletePost.errorMessage) {

        res.status(deletePost.status).json({
          "errorMessage" : deletePost.errorMessage
        });
        return;

      } else {

        res.status(200).json({message : "게시글 삭제에 성공했습니다."});
        return;

      }
    } catch (err) {

      console.log(err)
      res.status(400).json({
        errorMessage : "게시글 삭제에 실패하였습니다."
      })

    }


  }

}

module.exports = PostsControllers
