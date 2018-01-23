import React from 'react';
import { shallow } from 'enzyme';
import * as d3 from 'd3';
import TreeNode from '../../view_tree/TreeNode';

it('should render a foreignObject with an x and y value', () => {
  let nodeData = {
    title: "a node",
    children: []
  };
  // d3.tree calculates coords for nodes based on the size and location in tree
  let d3Node = d3.tree().size([100, 100])(d3.hierarchy(nodeData));

  let treeNode = shallow(<TreeNode data={d3Node} />);
  let foreignObject = treeNode.find('foreignObject');

  expect(foreignObject.length).toEqual(1);
  expect(foreignObject.at(0).props().x).toEqual(d3Node.x);
  expect(foreignObject.at(0).props().y).toEqual(d3Node.y);
});

it('should render the node title', () => {
  let nodeData = {
    title: "a node",
    children: []
  };
  let d3Node = d3.tree().size([100, 100])(d3.hierarchy(nodeData));

  let treeNode = shallow(<TreeNode data={d3Node} />);
  let foreignObject = treeNode.find('foreignObject');

  expect(foreignObject.text()).toEqual("a node");
});