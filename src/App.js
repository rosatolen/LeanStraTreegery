import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import TreeVis from './TreeVis';
import AddNodeForm from './AddNodeForm';
import actions from './store/TreeActions';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentRootNode: props.rootNodeID,
      previousRootNodes: []
    }
  }

  onNodeSelected = (nodeID) => {
    this.props.updateSelectedNode(nodeID);
  }

  addNode = (nodeInfo) => {
    this.props.addNode(nodeInfo.title, nodeInfo.description, this.props.selectedNode);
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
        <AddNodeForm onSubmit={this.addNode}/>
        <TreeVis nodes={this.props.tree} rootNodeID={this.state.currentRootNode} onNodeSelect={this.onNodeSelected} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tree: state.nodes,
    rootNodeID: state.rootNodeID,
    selectedNode: state.selectedNodeID
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedNode: (nodeID) => {
      dispatch(actions.selectNode(nodeID));
    },
    addNode: (title, description, parentID) => {
      dispatch(actions.addNode(title, description, parentID));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
