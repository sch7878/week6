const PostsService = require('../services/posts.service.js')

class PostsControllers {
  postsService = new PostsService();

  getAllPosts = async(req, res, next) => {
    const posts = await this.postsService.findAllPosts();


    res.status(posts.status).json(posts.message)
  }

  createPost = async (req, res, next) => {
    const {title, content} = req.body;
    const {userId, nickname} = res.locals.user;
    const likes = 0;

    const createPost = await this.postsService.createPost(title, content, userId, nickname, likes);

    res.status(createPost.status || 500).json(createPost.message);

    //400에러는 클라이언트단에서 발생, 500에러는 예상치 못한 에러(서버에서 발생)
    
  
  }
  

  getOnePost = async(req, res, next) => {
    const {postId} = req.params;

    const post = await this.postsService.findOnepost(postId);

    res.status(post.status || 400).json(post.message)
 
  };

  updatePost = async(req, res, next) => {
    const {postId} = req.params;
    const {title, content} = req.body;
    const {userId} = res.locals.user;

    const updatePostService = await this.postsService.updatePost(postId, title, content, userId);
    
    res.status(updatePostService.status || 400).json(updatePostService.message)
  }

  deletePost = async (req, res, next) => {
    const {postId} = req.params;
    const {userId} = res.locals.user;

    const deletePost = await this.postsService.deletePostService(postId, userId);

    res.status(deletePost.status || 400).json(deletePost.message)
      
  }

}

module.exports = PostsControllers
