import React, { Component } from 'react';
import axios from 'axios';
import ApolloClient, { gql } from 'apollo-boost';

class App extends Component {

  constructor() {
    super();
    this.state = {
      res: '',
      books: ['0', '2']
    }
  }

  sendData() {
    axios.get('http://localhost:5000/add', {
      params: {
        title: document.getElementById("sendData-title").value,
        author: document.getElementById("sendData-author").value
      }
    }).then(res => {
      console.log("res:" + res);
      this.setState({ res: res.data });
      document.getElementById("req-response").innerText = this.state.res;
    }).catch(err => {
      this.setState({ res: err });
      document.getElementById("req-response").innerText = this.state.res;
      console.log(err);
    });
  }

  componentDidMount() {
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
    }).then(result => this.setState({books: result.data.books}));
  }

  render() {
    return (
      <div className="App">
        <div>
          <input id="sendData-title" placeholder="Title" />
          <br />
          <input id="sendData-author" placeholder="Author" />
          <br />
          <button onClick={() => this.sendData()}>Send</button>
          <br />
          <p id="req-response">request's response goes here...</p>
        </div>
        <div>
          {
            this.state.books.map(books => <p>{books.title}</p>)
          }
        </div>
      </div>
    )
  }
}

export default App;