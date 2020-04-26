import React, { useState, useEffect } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

export default function Books() {

    const [books, setBooks] = useState([]);
    const lastId = books[books.length - 1]?.id;

    useEffect(() => {

        const client = new ApolloClient({
            uri: '/graphql'
        });

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
        }).then(result => {
            setBooks(result.data.books);
            console.log(lastId);
        });
    }, [lastId]);

    return (
        <div>
            {books.map(books =>
                <div key={books.id}>
                    <h3>{books.title}</h3>
                    <p>{books.author}</p>
                    <i>{books.description}</i>
                </div>
            )}
        </div>
    )
}