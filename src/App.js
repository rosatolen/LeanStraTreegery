import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import testTree from './testTree.json';
import { TreeNode } from './TreeNode';

class App extends Component {
  constructor() {
    super();
    this.state = {tree: testTree}
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
        <TreeNode node={this.state.tree}/>
      </div>
    );
  }
}

export default App;
