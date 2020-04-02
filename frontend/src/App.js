import React, { Component } from 'react';
import axios from 'axios';
import Books from './Components/Books.jsx';

class App extends Component {

  constructor() {
    super();
    this.state = {
      res: ''
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
          <Books />
        </div>
      </div>
    )
  }
}

export default App;