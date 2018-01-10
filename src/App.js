import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './App.css';
import TreeVis from './view_tree/TreeVis';
import AddNodeModal from './view_tree/AddNodeModal';
import actions from './store/TreeActions';
import AddVisionModal from './view_tree/AddVisionModal';

export class App extends Component {
  constructor(props) {
    super();
    this.state = {
      previousRootNodes: [],
      showAddNodeDialog: false,
      showAddVisionDialog: false
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

  toggleSetVisionDialog = () => {
    this.setState({
      showAddVisionDialog: !this.state.showAddVisionDialog
    });
  }

  showSetVisionDialog = (event) => {
    this.toggleSetVisionDialog();
    event.preventDefault();
  }

  setVision = (visionFormBody) => {
    this.props.setVision(visionFormBody.vision);
  }

  render() {
    let visionStatementHeader = <h1>{this.props.visionStatement}</h1>;
    let createVisionButton = (
      <div>
        <div> Let's start by adding a vision statement </div>
        <button onClick={this.showSetVisionDialog}>Add a vision</button>
      </div>
    );
    let createTreeButton = (
      <div>
        <div>It looks like you don't have a tree yet.</div>
        <button onClick={this.createTree}>Add a goal</button>
      </div>
    );
    let treeVis = (
      <TreeVis
        nodes={this.props.tree}
        onNodeSelect={this.onNodeSelected}
        onNodeDoubleClick={this.toggleAddNodeDialog}
      />
    );
    let addNodeModal = (
      <AddNodeModal
        onClose={this.toggleAddNodeDialog}
        onSubmit={this.addNode}
        parentNodeId={this.props.selectedNode}
      />
    );
    let setVisionModal = (
      <AddVisionModal
        onSubmit={this.setVision}
        onClose={this.toggleSetVisionDialog}
      /> 
    );

    return (
      <div>
        { this.props.visionStatement.length === 0 ? createVisionButton : visionStatementHeader }
        { this.props.tree.length === 0 ? createTreeButton : treeVis }
        { this.state.showAddNodeDialog ? addNodeModal : null }
        { this.state.showAddVisionDialog ? setVisionModal : null }
      </div>
    );
  }
}

App.propTypes = {
  tree: PropTypes.array.isRequired,
  selectedNodeID: PropTypes.number,
  visionStatement: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    tree: state.nodes,
    selectedNode: state.selectedNodeID,
    visionStatement: state.visionStatement
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedNode: (nodeID) => {
      dispatch(actions.selectNode(nodeID));
    },
    addNode: (title, description, parentID) => {
      dispatch(actions.addNode(title, description, parentID));
    },
    setVision: (statement) => {
      dispatch(actions.setVision(statement));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
