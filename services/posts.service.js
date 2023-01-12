const PostsRepository = require('../repositories/posts.repository.js');

const error = new Error();
const success = {};


class PostsService {
  postsRepository = new PostsRepository();

  findAllPosts = async () => {
    try {
      const allposts = await this.postsRepository.findAllPostsData();

      allposts.sort((a,b) => {
        return b.createdAt - a.createdAt
      })

      success.status = 200;
      success.message = {"data" : 
        allposts.map(post => {
          return {
            postsId : post.postId,
            nickname : post.nickname,
            title : post.title,
            createdAt : post.createdAt,
            updatedAt : post.updatedAt,
            likes : post.likes
            }
        })}

    
      return success


    } catch (error) {

      return error
    }
    
  }

  createPost = async (title, content, userId, nickname, likes) => {
      
    try {
      const createPostsData = await this.postsRepository.createPost(title, content, userId, nickname, likes)

      if(!title) {

        error.status = 412;
        error.message = {errorMessage : "제목을 작성해주세요."}
        throw error;        

      } else if(!content) {

        error.status = 412;
        error.message = {errorMessage : "내용을 입력해주세요."}
        throw error;    

      } else {

        success.status = 200;
        success. message = {message : "게시글 작성에 성공하였습니다." }
        
        return success;
      }
      
    } catch (error) {
      

      return error;

    }

    //에러메세지 status, message

    
  }
  
  findOnepost = async (postId) => {

    try {

    const Onepost = await this.postsRepository.findPostById(postId);
    
      if (!Onepost) {

        error.status = 412;
        error.message = {errorMessage : "게시글이 존재하지 않습니다."};
        throw error;

      } else {

        success.status = 200;
        success.message = { data : {

        postId : Onepost.postId,
        userId : Onepost.userId,
        nickname : Onepost.nickname,
        title : Onepost.title,
        content : Onepost.content,
        createdAt : Onepost.createdAt,
        updatedAt : Onepost.updatedAt,
        likes : Onepost.likes

        }
      }
        return success
      } 
    }catch (error) {

      return error;

    }

   
  }
  
  updatePost = async (postId, title, content, userId) => {

    try {
    const findPost = await this.postsRepository.findPostById(postId);

    console.log("찾아용" + findPost.userId)
  
      if(!findPost) {

        error.status = 412;
        error.message = {errorMessage : "게시물이 없습니다."};
        throw error;

      } else if(!title) {

        error.status = 412;
        error.message = {errorMessage : "게시물이 없습니다."};
        throw error;

      } else if (!content) {

        error.status = 412;
        error.message = {errorMessage : "내용을 입력해주세요."};
        throw error;

      } else if (userId !== findPost.userId) {

        error.status = 412;
        error.message = {errorMessage : "작성자가 아닙니다."};
        throw error;
        
      }  else {

        await this.postsRepository.updatePost(postId, title, content)
      
        const updatedPost = await this.postsRepository.findPostById(postId);

        success.status = 200;
        success.message = {message : "게시글 수정이 완료되었습니다."}

        return success;
      }
    } catch (error) {

      return error;

    }
  }
  
  deletePostService = async (postId, userId) => {

    try {
      const findPost = await this.postsRepository.findPostById(postId);

      if (!findPost) {

        error.status = 404;
        error.message = {errorMessage : "게시물이 없습니다."};
        throw error;

      }
      if (userId !== findPost.userId) {

        error.status = 412;
        error.message = {errorMessage : "작성자가 아닙니다."};
        throw error;
        
      }  else {
        
        await this.postsRepository.deletePostData(postId);
        
        success.status = 200;
        success.message = {"message" : "게시글을 삭제하였습니다."}

        return success;

      }

    } catch (error) {
      
      return error;
    }

  }

}

module.exports = PostsService

