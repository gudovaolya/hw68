import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Counter from "./containers/Counter/Counter";
import ToDoList from "./containers/ToDoList/ToDoList";
import Layout from "./components/Layout/Layout";

class App extends Component {
  render() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={Counter}/>
                <Route path="/todolist" exact component={ToDoList}/>
                <Route render={() => <h1>404 page not found</h1>}/>
            </Switch>
        </Layout>

    );
  }
}

export default App;
