import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import * as _ from "lodash";
import * as d3 from "d3";
import "../App.css";
import D3Node from './D3Node';
import * as familyTreeData from "./FamilyTree.json";

class D3Tree extends Component {

  constructor() {
    super();

    this.horizontalSize = 1000;
    this.verticalSize = 1000;
    this.horizontalPadding = 10;
    this.verticalPadding = 10;
    this.width = this.horizontalSize - 2 * this.horizontalPadding;
    this.height = this.verticalSize - 2 * this.verticalPadding;
    this.nodeHeight = 120;
    this.nodeWidth = 180;

    this.state = {
      familyTree: this.createHierarchyFrom(familyTreeData)
    };
  }

  createHierarchyFrom = data => {
    let tree = d3.tree()
      .size([this.width, this.height]);
    // .nodeSize([100, 100]);
    return tree(d3.hierarchy(data));
  }

  getNodeLinks = () => {
    let links = this.state.familyTree.links();
    return links.map(link => {
      let source = link.source;
      let target = link.target;
      let key = `${source.data.name} -> ${target.data.name}`;
      return (<line key={key} x1={source.x + 75} y1={source.y + 75} x2={target.x} y2={target.y} stroke="black" />);
    });
  }

  getNodeHtml = () => {
    let nodes = this.state.familyTree.descendants();

    return nodes.map(node => {
      return <D3Node key={node.data.name} node={node} height={this.nodeHeight} width={this.nodeWidth} />
    });
  }

  render() {
    let links = this.getNodeLinks();
    let nodes = this.getNodeHtml();
    return (
      <div>
        {/* <svg viewBox={`0 0 ${this.width} ${this.height}`}> */}
        <svg width={this.props.width - 2 * this.horizontalPadding} height={this.props.height - 2 * this.verticalPadding}>
          {links}
          {nodes}
        </svg>
      </div>
    );
  }
}

export default D3Tree;
