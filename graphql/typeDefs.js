const { gql } = require('apollo-server-express')

const typeDefs = gql`
  enum PermissionLevels {
    STANDARD
    MOD
    ADMIN
  }

  type Post {
    id: String
    postTitle: String
    author: String
    postBody: String
    postLikes: Int
    userId: String
    categoryId: String
    postComments: [String]
    postStatus: String
    postVisibility: String
    postImageURL: String
    postTags: [String]
    cursor: String
    likedBy: [String]
    updatedAt: String
    createdAt: String
  }

  type User {
    id: String
    userName: String
    userPassword: String
    userEmail: String
    userExp: Int
    userLevel: Int
    userPermission: PermissionLevels
    userRanking: String
    userPosts: [String]
    userComments: [String]
    userReports: [String]
    userImageURL: String
    userDescription: String
  }

  type Report {
    id: String
    postId: String
    commentId: String
    userId: String
    reportTitle: String
    reportBody: String
    solved: Boolean
  }

  type Comment {
    id: String
    userId: String
    commentBody: String
    commentLikes: Int
    commentReplies: [String]
    likedBy: [String]
  }

  type Category {
    id: String
    categoryPosts: [String]
    categoryTitle: String
  }

  type Query {

    posts(
      pageSize: Int
      after: String
    ): FindPosts!

    # posts: [Post],
    post(_id: String): Post,
    users: [User],
    user(_id: String): User,
    reports: [Report],
    # Campo do report pra ver se a denúncia já foi resolvida ou não
    # Boolean

    report(_id: String): Report,
    comments: [Comment],
    comment(_id: String): Comment,
    categories: [Category],
    category(_id: String): Category,
  }

  type FindPosts { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    posts: [Post]
  }

  type Mutation {
    # ############### POST ###############
    addPost(
      postTitle: String,
      author: String,
      postBody: String,
      postLikes: Int,
      userId: String,
      categoryId: String,
      postComments: [String],
      postStatus: String,
      postVisibility: String,
      postImageURL: String,
      postTags: [String],
      likedBy: [String],
      updatedAt: String,
      createdAt: String
    ): Post,
    deletePost(_id: String): Post,
    updatePost(
      _id: String,
      postTitle: String,
      author: String,
      postBody: String,
      postLikes: Int,
      userId: String,
      categoryId: String,
      postComments: [String],
      postStatus: String,
      postVisibility: String,
      postImageURL: String,
      postTags: [String],
      likedBy: [String],
      updatedAt: String,
      createdAt: String
    ): Post,

    # ############### USER ###############
    addUser(
      userName: String
      userPassword: String
      userEmail: String
      userExp: Int
      userLevel: Int
      userPermission: PermissionLevels
      userRanking: String
      userPosts: [String]
      userComments: [String]
      userReports: [String]
      userImageURL: String
      userDescription: String
    ): User,
    deleteUser(_id: String): User,
    updateUser(
      _id: String
      userName: String
      userPassword: String
      userEmail: String
      userExp: Int
      userLevel: Int
      userPermission: PermissionLevels
      userRanking: String
      userPosts: [String]
      userComments: [String]
      userReports: [String]
      userImageURL: String
      userDescription: String
    ): User

    # ############### REPORT ###############
    addReport(
      postId: String
      commentId: String
      userId: String
      reportTitle: String
      reportBody: String
      solved: Boolean
    ): Report,
    deleteReport(_id: String): Report,
    updateReport(
      _id: String
      postId: String
      commentId: String
      userId: String
      reportTitle: String
      reportBody: String
      solved: Boolean
    ): Report

    # ############### COMMENT ###############
    addComment(
      userId: String
      commentBody: String
      commentLikes: Int
      commentReplies: [String]
      likedBy: [String]
    ): Comment,
    deleteComment(_id: String): Comment,
    updateComment(
      _id: String
      userId: String
      commentBody: String
      commentLikes: Int
      commentReplies: [String]
      likedBy: [String]
    ): Comment

    # ############### CATEGORY ###############
    addCategory(
      categoryPosts: [String]
      categoryTitle: String
    ): Category,
    deleteCategory(_id: String): Category,
    updateCategory(
      _id: String
      categoryPosts: [String]
      categoryTitle: String
    ): Category
  }
`

module.exports = typeDefs