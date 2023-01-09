const PostsRepository = require('../repositories/posts.repository.js');

class PostsService {
  postsRepository = new PostsRepository();

  findAllPosts = async () => {
    const allposts = await this.postsRepository.findAllPostsData();

    allposts.sort((a,b) => {
      return b.createdAt - a.createdAt
    })

    try {
      return allposts.map(post => {
      return {
        postsId : post.postId,
        nickname : post.nickname,
        title : post.title,
        createdAt : post.createdAt,
        updatedAt : post.updatedAt,
        likes : post.likes
        }
      })
    } catch (err) {

      return {errorMessage : "게시글 조회에 실패하였습니다.", status:400};
    }
    
  }

  createPost = async (title, content, userId, nickname, likes) => {

    const createPostsData = await this.postsRepository.createPost(title, content, userId, nickname, likes)

    try {
      if(!title) {

        return {errorMessage : "제목을 작성해주세요.", status:400};

      } else if(!content) {

        return {errorMessage : "내용을 입력해주세요.", status:400};

      } else {
        
        return {
          postId: createPostsData.postId,
          nickname: createPostsData.nickname,
          title: createPostsData.title,
          content: createPostsData.content,
          createdAt: createPostsData.createdAt,
          updatedAt: createPostsData.updatedAt,
          likes : createPostsData.likes
        } 
      }
      
    } catch (err) {
      console.log(err)

      return {errorMessage : "게시글 작성에 실패하였습니다..", status:400};

    }

    
  }
  
  findOnepost = async (postId) => {
    const Onepost = await this.postsRepository.findeOnePostData(postId);

    try {
    
      if (!Onepost) {

        return {errorMessage : "게시글이 존재하지 않습니다.", status:400};

      } else {

        return {
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
    } catch (err) {

      return {errorMessage : "게시글 조회에 실패하였습니다.", status:400};

    }

   
  }
  
  updatePost = async (postId, title, content, userId) => {
    const findPost = await this.postsRepository.findPostById(postId);
    console.log(findPost)
  
    try {

      if(!findPost) {

        return {errorMessage : "게시물이 없습니다.", status: 400};

      } else if(!title) {

        return {errorMessage : "제목을 입력해주세요.", status: 400};

      } else if (!content) {

        return {errorMessage : "내용을 입력해주세요.", status: 400};

      } else if (userId !== findPost.userId) {

        return {errorMessage : "작성자가 아닙니다.", status: 400};
        
      }  else {

        await this.postsRepository.updatePost(postId, title, content)

        const updatedPost = await this.postsRepository.findPostById(postId);

        return {
          postId : updatedPost.postId,
          nickname : updatedPost.nickname,
          title : updatedPost.title,
          content : updatedPost.content,
          createdAt : updatedPost.createdAt,
          updatedAt : updatedPost.updatedAt
        }
      }
    } catch (err) {
      console.log(err)

      return {errorMessage : "형식이 올바르지 않습니다.", status:400};

    }
  }
  
  deletePostService = async (postId, userId) => {
    const findPost = await this.postsRepository.findPostById(postId);

    try {

      if (!findPost) {
        console.log("1111")

        return {errorMessage : "게시물이 없습니다.", status: 400};

      }
      if (userId !== findPost.userId) {

        console.log("2222")

        return {errorMessage : "작성자가 아닙니다.", status: 400};
        
      }  else {

        await this.postsRepository.deletePostData(postId);

        return {
          postId : findPost.postId,
          nickname : findPost.nickname,
          title : findPost.title,
          content : findPost.content,
          createdAt : findPost.createdAt,
          updatedAt : findPost.updatedAt
        };

      }

    } catch (err) {

      console.log(err)
      
      return {errorMessage : "요청한 데이터의 형식이 올바르지 않습니다.", status : 400};
    }

  }

}

module.exports = PostsService

