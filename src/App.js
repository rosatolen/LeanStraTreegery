import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import testTree from './testTree.json';
import treeConverter from './treeConverter';

class App extends Component {
  constructor() {
    super();
    this.state = {tree: testTree}
  }

  sayHello(name) {
    return "Oh, hi " + name;
  }

  printTree() {
    return treeConverter.toString(this.state.tree);
  }

  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
        <pre>
          {this.printTree()}
        </pre>
      </div>
    );
  }
}

export default App;
