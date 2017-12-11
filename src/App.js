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

  render() {
    return (
      <div>
        <TreeVis
          nodes={this.props.tree}
          onNodeSelect={this.onNodeSelected}
          onNodeDoubleClick={this.toggleAddNodeDialog}
        />
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
