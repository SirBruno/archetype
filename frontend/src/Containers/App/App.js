import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Home from '../Home/Home'
import Post from '../Post/Post'

export default function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/post">Post</Link>
          </nav>
          <Switch>
          <Route path="/post">
            <Post />
          </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}