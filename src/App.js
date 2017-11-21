import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
/* The below line is laziness.
   The initial state should be read from a datastore, and passed in as a prop to the App component.
   TODO: add react-redux to manage app state.
*/
import testTree from './testTree.json';
import { TreeNode } from './TreeNode';
import TreeVis from './TreeVis';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tree: testTree,
      currentNode: testTree,
      previousNodes: []
    }
  }

  updateCurrentNode = (newNode) => {
    if(newNode !== this.state.currentNode) {
      this.state.previousNodes.push(this.state.currentNode);
      this.setState({
        currentNode: newNode
      });
    }
  };

  goBack = () => {
    if(this.state.previousNodes.length !== 0) {
      this.setState({
        currentNode: this.state.previousNodes.pop()
      });
    }
  }

  showGoBackButton = () => {
    let button = (
      <div className="NavButton">
        <span onClick={this.goBack} className="Clickable">Go Back</span>
      </div>
    );
    return this.state.previousNodes.length > 0 ? button : null;
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
        {this.showGoBackButton()}
        <TreeNode node={this.state.currentNode} onNodeClick={this.updateCurrentNode}/>
        <TreeVis />
      </div>
    );
  }
}

export default App;
