const Post = require('../models/post.model')

const resolvers = {
  Query: {
    posts: () => Post.find({}),
    post: async (root, { _id }) => await Post.findById(_id)
  },
  Mutation: {
    addPost: async (_, args) => {
      try {
        let response = await Post.create({
          postTitle: args.postTitle,
          author: args.author,
          postBody: args.postBody,
          postLikes: 0
        });
        return response;
      } catch (e) {
        return e.message;
      }
    },
    updatePost: async (_, args) => {
      try {
        // make a call to Post.findById, so i can access the fields inside this block
        // i'm doing this to prevent a field saving as "null" if not specified in the args
        // otherwise, non-specified fields would make the existing respective field null
        let postToUpdate = await Post.findById(args._id, 'postTitle author postBody postLikes').exec()
        
        let response = await Post.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              // if the field was specified, update it the with new value
              // otherwise, keep the old value
              postTitle: args.postTitle || postToUpdate.postTitle,
              author: args.author || postToUpdate.author,
              postBody: args.postBody || postToUpdate.postBody,
              postLikes: args.postLikes || postToUpdate.postLikes
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