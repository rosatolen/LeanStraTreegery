import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import TreeVis from './TreeVis';
import AddNodeModal from './AddNodeModal';
import actions from './store/TreeActions';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentRootNode: props.rootNodeID,
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
    },() => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <TreeVis nodes={this.props.tree} rootNodeID={this.state.currentRootNode} onNodeSelect={this.onNodeSelected} onNodeDoubleClick={this.toggleAddNodeDialog}/>
        <AddNodeModal isOpen={this.state.showAddNodeDialog} onClose={this.toggleAddNodeDialog} onSubmit={this.addNode}/>
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
