import React from 'react';
import * as d3 from 'd3';

import TreeNode from './TreeNode';

let Tree = (props) => {

  let hierarchyData = d3.stratify().id(datum => datum.id).parentId(datum => datum.parentID)(props.tree);
  let treeData = d3.tree().size([props.width, props.height])(hierarchyData);

  let inflateNodes = (nodes) => {
    return nodes.map(nodeData => {
      return <TreeNode key={nodeData.data.title} data={nodeData} />;
    });
  }

  let createNodeLinks = () => {
    let links = treeData.links();

    return links.map(link => {
      let source = link.source;
      let target = link.target;
      let key = `${source.data.title} -> ${target.data.title}`;
      let linkGenerator = d3.linkVertical()
        .x(node => node.x)
        .y(node => node.y);

      return (<path key={key} d={linkGenerator(link)} fill="none" stroke="black" />);
    });
  }

  return (
    <div>
      <svg width={props.width} height={props.height}>
        {createNodeLinks(props.tree)}
        {inflateNodes(treeData.descendants())}
      </svg>
    </div>
  );
}

export default Tree;