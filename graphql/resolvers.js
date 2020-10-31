const { paginateResults } = require('./utils');
const Schemas = require('../models/Schemas')

const resolvers = {
  // ############################# POST #############################
  Query: {

    posts: async (_, { pageSize = 3, after, category }, { dataSources }) => {
      const allPosts = await Schemas.Post.find({});
      // we want these in reverse chronological order
      allPosts.reverse();

      let posts = paginateResults({
        after,
        pageSize,
        category,
        results: allPosts
      });

      // console.log(category)
      // ###############################################################################
      // ###############################################################################

      // if (category !== undefined) {
      //   let postCategory = [category.toUpperCase()]
      //   let filteredArr = posts.filter(function (item) {
      //     return postCategory.indexOf(item.categoryId.toUpperCase()) > -1
      //   })

      //   posts = filteredArr
      // }

      // ###############################################################################
      // ###############################################################################

      return {
        posts,
        cursor: posts.length ? posts.length - 1 : 0,
        // if the cursor at the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: posts.length
          ? posts.length - 1 !==
          allPosts.length - 1
          : false,
      };
    },

    // posts: () => Schemas.Post.find({}),
    post: async (root, { _id }) => await Schemas.Post.findById(_id),
    users: () => Schemas.User.find({}),
    user: async (root, { _id }) => await Schemas.User.findById(_id),
    reports: () => Schemas.Report.find({}),
    report: async (root, { _id }) => await Schemas.Report.findById(_id),
    comments: () => Schemas.Comment.find({}),
    comment: async (root, { _id }) => await Schemas.Comment.findById(_id),
    categories: () => Schemas.Category.find({}),
    category: async (root, { _id }) => await Schemas.Category.findById(_id)
  },

  Mutation: {
    addPost: async (_, args) => {
      try {
        let response = await Schemas.Post.create({
          postTitle: args.postTitle,
          author: args.author,
          postBody: args.postBody,
          postLikes: 0,
          userId: args.userId,
          categoryId: args.categoryId,
          postComments: args.postComments,
          postStatus: args.postStatus,
          postVisibility: args.postVisibility,
          postImageURL: args.postImageURL,
          postTags: args.postTags,
          likedBy: args.likedBy,
          updatedAt: args.updatedAt,
          createdAt: args.createdAt
        })
        console.log(response);
        return response;
      } catch (e) { console.log(e.message); return e.message }
    },
    updatePost: async (_, args) => {
      try {
        // make a call to Post.findById, so i can access the fields inside this block
        // i'm doing this to prevent a field saving as "null" if not specified in the args
        // otherwise, non-specified fields would make the existing respective field null
        let postToUpdate = await Schemas.Post.findById(
          args._id,
          `postTitle
          author
          postBody
          postLikes
          userId
          categoryId
          postComments
          postStatus
          postVisibility
          postImageURL
          postTags
          likedBy
          updatedAt
          createdAt
          `
        ).exec()

        let response = await Schemas.Post.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              // if the field was specified, update it the with new value
              // otherwise, keep the old value
              postTitle: args.postTitle == null ? postToUpdate.postTitle : args.postTitle,
              author: args.author == null ? postToUpdate.author : args.author,
              postBody: args.postBody == null ? postToUpdate.postBody : args.postBody,
              postLikes: args.postLikes == null ? postToUpdate.postLikes : args.postLikes,
              userId: args.userId == null ? postToUpdate.userId : args.userId,
              categoryId: args.categoryId == null ? postToUpdate.categoryId : args.categoryId,
              postComments: args.postComments == null ? postToUpdate.postComments : args.postComments,
              postStatus: args.postStatus == null ? postToUpdate.postStatus : args.postStatus,
              postVisibility: args.postVisibility == null ? postToUpdate.postVisibility : args.postVisibility,
              postImageURL: args.postImageURL == null ? postToUpdate.postImageURL : args.postImageURL,
              postTags: args.postTags == null ? postToUpdate.postTags : args.postTags,
              likedBy: args.likedBy == null ? postToUpdate.likedBy : args.likedBy,
              updatedAt: args.updatedAt == null ? postToUpdate.updatedAt : args.updatedAt,
              createdAt: args.createdAt == null ? postToUpdate.createdAt : args.createdAt
            }
          }, { new: true })
        return response
      } catch (e) { return e.message }
    },
    deletePost: async (_, args) => {
      try {
        let response = await Schemas.Post.findOneAndRemove(args)
        return response
      } catch (e) { return e.message }
    },
    addUser: async (_, args) => {
      try {
        let response = await Schemas.User.create({
          username: args.username,
          nickname: args.nickname,
          userExp: 0,
          userLevel: 0,
          userPermission: args.userPermission,
          userRanking: args.userRanking,
          userPosts: args.userPosts,
          userComments: args.userPosts,
          userReports: args.userReports,
          userImageURL: args.userImageURL,
          userDescription: args.userDescription
        })
        return response
      } catch (e) { return e.message }
    },
    updateUser: async (_, args) => {
      try {
        let userToUpdate = await Schemas.User.findById(
          args._id,
          `username
          nickname
          userExp
          userLevel
          userPermission
          userRanking
          userPosts
          userComments
          userReports
          userImageURL
          userDescription
          `
        ).exec()

        let response = await Schemas.User.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              username: args.username == null ? userToUpdate.username : args.username,
              nickname: args.nickname == null ? userToUpdate.nickname : args.nickname,
              userExp: args.userExp == null ? userToUpdate.userExp : args.userExp,
              userLevel: args.userLevel == null ? userToUpdate.userLevel : args.userLevel,
              userPermission: args.userPermission == null ? userToUpdate.userPermission : args.userPermission,
              userRanking: args.userRanking == null ? userToUpdate.userRanking : args.userRanking,
              userPosts: args.userPosts == null ? userToUpdate.userPosts : args.userPosts,
              userComments: args.userComments == null ? userToUpdate.userComments : args.userComments,
              userReports: args.userReports == null ? userToUpdate.userReports : args.userReports,
              userImageURL: args.userImageURL == null ? userToUpdate.userImageURL : args.userImageURL,
              userDescription: args.userDescription == null ? userToUpdate.userDescription : args.userDescription
            }
          }, { new: true })
        return response
      } catch (e) { return e.message }
    },
    deleteUser: async (_, args) => {
      try {
        let response = await Schemas.User.findOneAndRemove(args)
        return response
      } catch (e) { return e.message }
    },
    addReport: async (_, args) => {
      try {
        let response = await Schemas.Report.create({
          postId: args.postId,
          commentId: args.commentId,
          userId: args.userId,
          reportTitle: args.reportTitle,
          reportBody: args.reportBody,
          solved: false
        })
        return response
      } catch (e) { return e.message }
    },
    updateReport: async (_, args) => {
      try {
        let reportToUpdate = await Schemas.Report.findById(
          args._id,
          `postId
          commentId
          userId
          reportTitle
          reportBody
          solved
          `
        ).exec()

        let response = await Schemas.Report.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              postId: args.postId == null ? reportToUpdate.postId : args.postId,
              commentId: args.commentId == null ? reportToUpdate.commentId : args.commentId,
              userId: args.userId == null ? reportToUpdate.userId : args.userId,
              reportTitle: args.reportTitle == null ? reportToUpdate.reportTitle : args.reportTitle,
              reportBody: args.reportBody == null ? reportToUpdate.reportBody : args.reportBody,
              solved: args.solved == null ? reportToUpdate.solved : args.solved
            }
          }, { new: true })
        return response
      } catch (e) { return e.message }
    },
    deleteReport: async (_, args) => {
      try {
        let response = await Schemas.Report.findOneAndRemove(args)
        return response
      } catch (e) { return e.message }
    },
    addComment: async (_, args) => {
      try {
        let response = await Schemas.Comment.create({
          userId: args.userId,
          commentBody: args.commentBody,
          commentLikes: 0,
          commentReplies: args.commentReplies,
          likedBy: args.likedBy
        })
        return response
      } catch (e) { return e.message }
    },
    updateComment: async (_, args) => {
      try {
        let commentToUpdate = await Schemas.Comment.findById(
          args._id,
          `userId
          commentBody
          commentLikes
          commentReplies`
        ).exec()

        let response = await Schemas.Comment.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              userId: args.userId == null ? commentToUpdate.userId : args.userId,
              commentBody: args.commentBody == null ? commentToUpdate.commentBody : args.commentBody,
              commentLikes: args.commentLikes == null ? commentToUpdate.commentLikes : args.commentLikes,
              commentReplies: args.commentReplies == null ? commentToUpdate.commentReplies : args.commentReplies,
              likedBy: args.likedBy == null ? commentToUpdate.likedBy : args.likedBy
            }
          }, { new: true })
        return response
      } catch (e) { return e.message }
    },
    deleteComment: async (_, args) => {
      try {
        let response = await Schemas.Comment.findOneAndRemove(args)
        return response
      } catch (e) { return e.message }
    },
    addCategory: async (_, args) => {
      try {
        let response = await Schemas.Category.create({
          categoryPosts: args.categoryPosts,
          categoryTitle: args.categoryTitle
        })
        return response
      } catch (e) { return e.message }
    },
    updateCategory: async (_, args) => {
      try {
        let categoryToUpdate = await Schemas.Category.findById(
          args._id,
          `categoryPosts
          categoryTitle`
        ).exec()

        let response = await Schemas.Category.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              categoryPosts: args.categoryPosts == null ? categoryToUpdate.categoryPosts : args.categoryPosts,
              categoryTitle: args.categoryTitle == null ? categoryToUpdate.categoryTitle : args.categoryTitle
            }
          }, { new: true })
        return response
      } catch (e) { return e.message }
    },
    deleteCategory: async (_, args) => {
      try {
        let response = await Schemas.Category.findOneAndRemove(args)
        return response
      } catch (e) { return e.message }
    }
  },
}

module.exports = resolvers