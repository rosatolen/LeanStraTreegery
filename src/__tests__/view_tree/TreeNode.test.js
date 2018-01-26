import React from 'react';
import { shallow } from 'enzyme';
import * as d3 from 'd3';
import TreeNode from '../../view_tree/TreeNode';

describe('TreeNode', () => {

  it('should render a foreignObject with an x and y value', () => {
    let nodeData = {
      id: 1,
      title: "a node",
      children: []
    };
    // d3.tree calculates coords for nodes based on the size and location in tree
    let d3Node = d3.tree().size([100, 100])(d3.hierarchy(nodeData));

    let treeNode = shallow(
      <TreeNode
        width={100}
        height={100}
        data={d3Node}
      />
    );
    let foreignObject = treeNode.find('foreignObject');

    expect(foreignObject.length).toEqual(1);
    // Assert that the x value is offset to center the node on the connecting line
    expect(foreignObject.at(0).props().x).toEqual(d3Node.x - 50);
    expect(foreignObject.at(0).props().y).toEqual(d3Node.y);
  });

  it('should render the node title', () => {
    let nodeData = {
      id: 1,
      title: "a node",
      children: []
    };
    let d3Node = d3.tree().size([100, 100])(d3.hierarchy(nodeData));

    let treeNode = shallow(
      <TreeNode
        data={d3Node}
      />
    );
    let foreignObject = treeNode.find('foreignObject');

    expect(foreignObject.text()).toEqual("a node");
  });

  it('should pass its node data to the given double click callback', () => {
    let nodeData = {
      id: 1,
      title: "a node",
      children: []
    };
    let d3Node = d3.tree().size([100, 100])(d3.hierarchy(nodeData));
    let listener = jest.fn();
    let treeNode = shallow(
      <TreeNode
        data={d3Node}
        doubleClickListener={listener} />
    );

    treeNode.simulate('doubleClick');
    expect(listener).toHaveBeenCalledWith(d3Node.data);
  });
});