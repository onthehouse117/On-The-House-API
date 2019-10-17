import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import "./App.css";
import "./style.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./components/Home.js";
import NavBar from "./components/NavBar.js";
import SubLease from "./components/SubLease.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <DocumentTitle title="On The House"></DocumentTitle>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/SubLease" component={SubLease} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
