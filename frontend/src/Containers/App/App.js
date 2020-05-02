import React from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import Books from '../../Components/Books';
import { EnvProvider } from '../../Contexts/EnvContext';

const uri = process.env.REACT_APP_URI;

export default function App () {
  const client = new ApolloClient({ uri });

  const dataTitle = React.createRef();
  const dataAuthor = React.createRef();
  const dataDescription = React.createRef();

  const sendData = () => {
    client.mutate({
      variables: {
        title: dataTitle.current.value,
        author: dataAuthor.current.value,
        description: dataDescription.current.value
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
        <input ref={dataTitle} placeholder="Title" />
        <br />
        <input ref={dataAuthor} placeholder="Author" />
        <br />
        <input ref={dataDescription} placeholder="Description" />
        <br />
        <button onClick={() => sendData()}>Send</button>
        <br />
        <p id="req-response">request's response goes here...</p>
        <EnvProvider value={uri}>
          <Books />
        </EnvProvider>
      </div>
    </div>
  )
}