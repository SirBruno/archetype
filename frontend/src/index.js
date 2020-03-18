import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000'
});

client.query({
    query: gql`
        {
            books {
                title
                author
            }
        }
    `
}).then(result => console.log(result));

ReactDOM.render(<App />, document.getElementById('root'));