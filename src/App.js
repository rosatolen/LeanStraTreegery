import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';
import TreeVis from './view_tree/TreeVis';
import AddNodeModal from './view_tree/AddNodeModal';
import actions from './store/TreeActions';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      previousRootNodes: [],
      showAddNodeDialog: false
    }
  }

  onNodeSelected = (nodeID) => {
    this.props.updateSelectedNode(nodeID);
  }

  addNode = (nodeInfo) => {
    this.props.addNode(nodeInfo.title, nodeInfo.description, this.props.selectedNode);
  }

  toggleAddNodeDialog = () => {
    this.setState({
      showAddNodeDialog: !this.state.showAddNodeDialog
    });
  }

  createTree = (event) => {
    this.toggleAddNodeDialog();
    event.preventDefault();
  }

  render() {
    let createTreeButton = (
      <div>
        <div>It looks like you don't have a tree yet.</div>
        <button onClick={this.createTree}>Create a tree</button>
      </div>
    );
    let treeVis = (
        <TreeVis
          nodes={this.props.tree}
          onNodeSelect={this.onNodeSelected}
          onNodeDoubleClick={this.toggleAddNodeDialog}
        />
    );
    return (
      <div>
        {this.props.tree.length === 0 ? createTreeButton : treeVis}
        <AddNodeModal
          isOpen={this.state.showAddNodeDialog}
          onClose={this.toggleAddNodeDialog}
          onSubmit={this.addNode}
          parentNodeId={this.props.selectedNode}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tree: state.nodes,
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
