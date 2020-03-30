import React, { useState, useEffect } from 'react';
import ApolloClient, { gql } from 'apollo-boost';

export default function Books() {

    const [books, setName] = useState([]);

    useEffect(() => {
        const client = new ApolloClient({
            uri: 'http://localhost:4000'
        });

        client.query({
            query: gql`
                {
                    books {
                        id
                        title
                        author
                    }
                }
            `
        }).then(result => {
            setName(result.data.books);
            console.log(result.data);
        });
    });

    return (
        <div>
            {
                books.map(books => <p>{books.title}</p>)
            }
        </div>
    )
}