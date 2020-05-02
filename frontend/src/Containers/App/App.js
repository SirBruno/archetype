import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import Books from '../../Components/Books';
import { EnvProvider } from '../../Contexts/EnvContext';
const apiUrl = process.env.NODE_ENV === 'production' ? 'https://archetypeofficial.herokuapp.com' : process.env.REACT_APP_URI;

const App = () => {
  const client = new ApolloClient({
    uri: `${apiUrl}/graphql`
  });

  const sendData = () => {
    client.mutate({
      variables: {
        title: document.getElementById("sendData-title").value,
        author: document.getElementById("sendData-author").value,
        description: document.getElementById("sendData-description").value
      },
      mutation: gql`
        mutation addBook($title: String, $author: String, $description: String){
          addBook(title: $title, author: $author, description: $description) {
            title
            author
            description
          }
        }
    `,
    }).then(console.log('Book Added! ;)'));
  }

  return (
    <div className="App">
      <div>
        <input id="sendData-title" placeholder="Title" />
        <br />
        <input id="sendData-author" placeholder="Author" />
        <br />
        <input id="sendData-description" placeholder="Description" />
        <br />
        <button onClick={() => sendData()}>Send</button>
        <br />
        <p id="req-response">request's response goes here...</p>
        <EnvProvider value="testing the context">
          <Books />
        </EnvProvider>
      </div>
    </div>
  )
}

export default App;