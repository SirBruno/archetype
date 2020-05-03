import React, { useEffect, useState } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import Books from '../../Components/Books';
import { EnvProvider } from '../../Contexts/EnvContext';

const uri = process.env.REACT_APP_URI;
const client = new ApolloClient({ uri });

export default function Home() {
  const dataTitle = React.createRef();
  const dataAuthor = React.createRef();
  const dataDescription = React.createRef();
  const [books, setBooks] = useState([])

  useEffect(() => {
    client.query({
      query: gql`
                {
									books {
										id
										title
										author
										description
									}
                }
            `
    }).then(result => { setBooks(result.data.books) })
  }, []);

  const deleteBook = async (_id) => {
    const deletedBook = await client.mutate({
      variables: { _id },
      mutation: gql`
        mutation deleteBook($_id: String){
          deleteBook(_id: $_id) { id }
        }
    `,
    })
    const deletedId = await deletedBook.data.deleteBook.id;
    setBooks(books.filter(book => book.id !== deletedId))
  }

  const addBook = async () => {
    const res = await client.mutate({
      variables: {
        title: dataTitle.current.value,
        author: dataAuthor.current.value,
        description: dataDescription.current.value
      },
      mutation: gql`
        mutation addBook($title: String, $author: String, $description: String){
          addBook(title: $title, author: $author, description: $description) {
            id
            title
            author
            description
          }
        }
    `,
    })

    const book = await res.data.addBook;
    setBooks([...books, book]);
  }


  return (
    <div className="Home">
      <div>
        <input ref={dataTitle} placeholder="Title" />
        <br />
        <input ref={dataAuthor} placeholder="Author" />
        <br />
        <input ref={dataDescription} placeholder="Description" />
        <br />
        <button onClick={() => addBook()}>Send</button>
        <br />
        <p id="req-response">request's response goes here...</p>
        <EnvProvider value={uri}>
          <Books books={books} setBooks={setBooks} deleteBook={deleteBook} />
        </EnvProvider>
      </div>
    </div>
  )
}