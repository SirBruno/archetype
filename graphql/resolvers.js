const Post = require('../models/post.model')

const resolvers = {
  Query: {
    posts: () => Post.find({}),
    post: async (root, { _id }) => await Post.findById(_id)
  },
  Mutation: {
    addPost: async (_, args) => {
      try {
        let response = await Post.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    updatePost: async (_, args) => {
      try {
        let response = await Post.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              postTitle: args.postTitle,
              author: args.author,
              postBody: args.postBody,
              postLikes: args.postLikes
            }
          }, { new: true });
        return response;
      } catch (e) { return e.message }
    },
    deletePost: async (_, args) => {
      try {
        let response = await Post.findOneAndRemove(args)
        return response;
      } catch (e) { return e.message }
    }
  }
}

module.exports = resolvers;