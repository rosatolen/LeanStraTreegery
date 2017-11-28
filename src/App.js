import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { TreeNode } from './TreeNode';
import TreeVis from './TreeVis';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentRootNode: props.rootNodeID,
      previousRootNodes: []
    }
  }

  updateRootNode = (newRootID) => {
    if(newRootID !== this.state.currentRootNode) {
      this.state.previousRootNodes.push(this.state.currentRootNode);
      this.setState({
        currentRootNode: newRootID
      });
    }
  };

  goBack = () => {
    if(this.state.previousRootNodes.length !== 0) {
      this.setState({
        currentRootNode: this.state.previousRootNodes.pop()
      });
    }
  }

  showGoBackButton = () => {
    let button = (
      <div className="NavButton">
        <span onClick={this.goBack} className="Clickable">Go Back</span>
      </div>
    );
    return this.state.previousRootNodes.length > 0 ? button : null;
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
        <TreeNode nodes={this.props.tree} rootNodeID={this.state.currentRootNode} onNodeClick={this.updateRootNode} />
        <TreeVis nodes={this.props.tree} rootNodeID={this.state.currentRootNode} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tree: state.nodes,
    rootNodeID: state.rootNodeID
  }
};

export default connect(mapStateToProps, () => {return {}})(App);
