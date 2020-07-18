const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Post {
    id: String
    postTitle: String
    author: String
    postBody: String
    postLikes: Int
  }

  type Query {
    posts: [Post],
    post(_id: String): Post
  }

  type Mutation {
    addPost(postTitle: String, author: String, postBody: String, postLikes: Int): Post,
    deletePost(_id: String): Post,
    updatePost(_id: String, postTitle: String, author: String, postBody: String, postLikes: Int): Post
  }
`

module.exports = typeDefs