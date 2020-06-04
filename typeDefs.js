const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Book {
    id: String
    title: String
    author: String
    description: String
  }

  type Query {
    books: [Book],
    book(_id: String): Book
  }

  type Mutation {
    addBook(title: String, author: String, description: String): Book,
    deleteBook(_id: String): Book,
    updateBook(_id: String, title: String, author: String, description: String): Book
  }
`

module.exports = typeDefs