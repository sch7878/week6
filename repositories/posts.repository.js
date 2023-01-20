const {Posts} = require('../models')


class PostsRepository {

  findAllPostsData = async() => {

    const findAllPosts = await Posts.findAll()

    return findAllPosts;
  };

  findPostById = async (postId) => {

    const findOnePost = await Posts.findByPk(postId);

    return findOnePost;
  };

  createPost = async(title, content, userId, nickname, likes) => {
    const createPostData = await Posts.create({title, content, userId, nickname, likes})

    return createPostData;
  }

  updatePost = async (postId, title, content) => {
    const updatePostData = await Posts.update(
      {title, content},
      {where: {postId}
    })

    return updatePostData;
  }

  deletePostData = async (postId) => {

    const deletePost = await Posts.destroy(
      {where : {postId}}
    )

    return deletePost;
  }
}

module.exports = PostsRepository;