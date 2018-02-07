import React from 'react';
import { shallow } from 'enzyme';
import * as d3 from 'd3';
import TreeNode from '../../view_tree/TreeNode';
import { tree } from 'd3';

describe('TreeNode', () => {

  it('should render an SVG with an x and y value', () => {
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
    let rootSVG = treeNode.find('svg.tree_node');

    expect(rootSVG.length).toEqual(1);
    // Assert that the x value is offset to center the node on the connecting line
    expect(rootSVG.at(0).props().x).toEqual(d3Node.x - 50);
    expect(rootSVG.at(0).props().y).toEqual(d3Node.y);
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

    expect(foreignObject.at(0).text()).toEqual("a node");
  });

  it('should render the node description', () => {
    let nodeData = {
      id: 1,
      title: "a node",
      description: "node description",
      children: []
    };
    let d3Node = d3.tree().size([100, 100])(d3.hierarchy(nodeData));

    let treeNode = shallow(
      <TreeNode
        data={d3Node}
      />
    );
    let foreignObject = treeNode.find('foreignObject');

    expect(foreignObject.at(1).text()).toEqual("node description");
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

  it('should render a title truncation svg when truncateTitle is true', () => {
    let nodeData = {
      id: 1,
      title: "a long node title long enough to overflow into multiple lines, and maybe even longer. Here's some more. And some more.",
      description: "node description",
      children: []
    };
    let d3Node = d3.tree().size([200, 100])(d3.hierarchy(nodeData));

    let treeNode = shallow(
      <TreeNode
        width={200}
        height={100}
        data={d3Node}
      />
    );

    treeNode.setState({truncateTitle: true});

    let truncation = treeNode.find('.truncation');
    treeNode.render()

    expect(truncation.length).toBe(1);
    expect(truncation.props().y).toBe('1em');
    expect(truncation.text()).toBe('...');
  });

  it('should render a description truncation svg when truncateDescription is true', () => {
    let nodeData = {
      id: 1,
      title: "a long node title long enough to overflow into multiple lines, and maybe even longer. Here's some more. And some more.",
      description: "node description",
      children: []
    };
    let d3Node = d3.tree().size([200, 100])(d3.hierarchy(nodeData));

    let treeNode = shallow(
      <TreeNode
        width={200}
        height={100}
        data={d3Node}
      />
    );

    treeNode.setState({truncateDescription: true});

    let truncation = treeNode.find('.truncation');
    treeNode.render()

    expect(truncation.length).toBe(1);
    expect(truncation.props().y).toBe('4.5em');
    expect(truncation.text()).toBe('...');
  });
});