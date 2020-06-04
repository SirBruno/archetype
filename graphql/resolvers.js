const Book = require('../models/book.model')

const resolvers = {
  Query: {
    books: () => Book.find({}),
    book: async (root, { _id }) => await Book.findById(_id)
  },
  Mutation: {
    addBook: async (_, args) => {
      try {
        let response = await Book.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    updateBook: async (_, args) => {
      try {
        let response = await Book.findOneAndUpdate({ _id: args._id },
          {
            $set: {
              title: args.title,
              author: args.author,
              description: args.description,
            }
          }, { new: true });
        return response;
      } catch (e) { return e.message }
    },
    deleteBook: async (_, args) => {
      try {
        let response = await Book.findOneAndRemove(args)
        return response;
      } catch (e) { return e.message }
    }
  }
}

module.exports = resolvers