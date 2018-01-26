import React, { Component } from 'react';
import * as d3 from 'd3';
import TreeNode from './TreeNode';

class Tree extends Component {

  constructor(props) {
    super(props);
    this.nodeHeight = 100;
    this.nodeWidth = 200;
    this.state = {
      treeData: this.convertNodesToTree(props.tree)
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.tree.toString() !== this.props.tree.toString()) {
      this.setState({
        treeData: this.convertNodesToTree(nextProps.tree)
      });
    }
  };

  convertNodesToTree = (nodes) => {
    let hierarchyData = d3.stratify().id(datum => datum.id).parentId(datum => datum.parentID)(nodes);
    let treeRoot = d3.tree().size([this.props.width, this.props.height - this.nodeHeight])(hierarchyData);
    return treeRoot;
  };

  onNodeDoubleClick = (nodeData) => {
    this.props.onNodeSelect(nodeData.id);
    this.props.onNodeDoubleClick();
  };

  inflateNodes = () => {
    let nodes = this.state.treeData.descendants();
    return nodes.map(node => {
      return (
        <TreeNode
          key={node.data.title}
          width={this.nodeWidth}
          height={this.nodeHeight}
          data={node}
          doubleClickListener={this.onNodeDoubleClick}
        />
      );
    });
  };

  createNodeLinks = () => {
    let links = this.state.treeData.links();

    return links.map(link => {
      let source = link.source;
      let target = link.target;
      let key = `${source.data.title} -> ${target.data.title}`;
      let linkGenerator = d3.linkVertical()
        .x(node => node.x)
        .y(node => node.y);

      return (<path key={key} d={linkGenerator(link)} fill="none" stroke="black" />);
    });
  };

  render = () => {
    return (
      <div>
        <svg width={this.props.width} height={this.props.height}>
          {this.createNodeLinks()}
          {this.inflateNodes()}
        </svg>
      </div>
    );
  }
};

export default Tree;