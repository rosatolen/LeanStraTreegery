import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import TreeVis from './TreeVis';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentRootNode: props.rootNodeID,
      previousRootNodes: []
    }
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
