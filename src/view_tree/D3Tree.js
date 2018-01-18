import React, { Component } from "react";
import * as d3 from "d3";
import "../App.css";
import D3Node from './D3Node';
import * as familyTreeData from "./FamilyTree.json";

class D3Tree extends Component {

  constructor(props) {
    super(props);

    this.horizontalPadding = 10;
    this.verticalPadding = 10;
    this.width = props.width - 2 * this.horizontalPadding;
    this.height = props.height - 2 * this.verticalPadding;
    this.nodeHeight = 120;
    this.nodeWidth = 180;

    this.state = {
      familyTree: this.createHierarchyFrom(familyTreeData)
    };
  }

  createHierarchyFrom = data => {
    let tree = d3.tree()
      .size([this.width, this.height]);
    return tree(d3.hierarchy(data));
  }

  getNodeLinks = () => {
    let links = this.state.familyTree.links();
    return links.map(link => {
      let source = link.source;
      let target = link.target;
      let key = `${source.data.name} -> ${target.data.name}`
      let linkGenerator = d3.linkVertical()
        .x((d) => { return d.x; })
        .y((d) => { return d.y; });
      // let line = (<line key={key} x1={source.x + 75} y1={source.y + 75} x2={target.x} y2={target.y} stroke="black" />);
      let path = (<path key={key} d={linkGenerator(link)} fill="none" stroke="black" />);
      return path;
    });
  }

  getNodeHtml = () => {
    let nodes = this.state.familyTree.descendants();

    return nodes.map(node => {
      return <D3Node key={node.data.name} node={node} height={this.nodeHeight} width={this.nodeWidth} />
    });
  }

  addZoomTransform = (element) => {
    let zoomAndTranslate = () => {
      console.log(d3.event.transform)
      d3.select('g#svgContents')
        .attr('transform', d3.event.transform);
    }
    let zoomTranslate = d3.zoom()
      .on('zoom', zoomAndTranslate);

    d3.select(element).call(zoomTranslate)
    d3.selectAll(D3Node).call(zoomTranslate)
  }

  addNode = () => {
    let newTree = { ...familyTreeData };

    let offspring = {
      name: "Dirt McGirt"
    };

    newTree.children.filter(child => {
      if (child.name == 'Abel') {
        if (!child.children) {
          child.children = [];
        }
        child.children.push(offspring);
      }
    });

    let newHierarchy = this.createHierarchyFrom(newTree);
    this.setState({
      familyTree: newHierarchy
    });
  }

  deleteEnoch = () => {
    let newTree = { ...familyTreeData };

    newTree.children.find(child => child.name == "Awan").children = [];

    let newHierarchy = this.createHierarchyFrom(newTree);
    this.setState({
      familyTree: newHierarchy
    });
  }

  render() {
    let links = this.getNodeLinks();
    let nodes = this.getNodeHtml();
    return (
      <div>
        <div>
          <button onClick={this.addNode} > Add a person to Abel </button>
          <button onClick={this.deleteEnoch} > Get rid of Enoch </button>
        </div>
        <svg width={this.props.width} height={this.props.height} ref={this.addZoomTransform}>
          <g id="svgContents">
            {links}
            {nodes}
          </g>
        </svg>
      </div>
    );
  }
}

export default D3Tree;
