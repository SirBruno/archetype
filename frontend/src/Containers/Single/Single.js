import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default function Single() {
  const { topicId } = useParams();
  const client = useApolloClient();
  const [book, setBook] = useState(0);

  useEffect(() => {

    const getBook = async () => {
      const res = await client.query({
        variables: { _id: topicId },
        query: gql`
          query book($_id: String){
            book(_id: $_id) {
              title
              author
              description
            }
          }
      `,
      })

      const bookRes = await res.data.book
      setBook(bookRes);
      console.log(book)
    }

    getBook()
  });

  if (book === 0) {
    return <h3>Loading...</h3>
  } else return (
    <div>
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  )
}