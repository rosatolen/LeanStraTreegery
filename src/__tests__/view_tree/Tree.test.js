import React from 'react';
import { mount, shallow } from 'enzyme';
import Tree from '../../view_tree/Tree';
import TreeNode from '../../view_tree/TreeNode';

describe('Tree', () => {
  it('should render a node for each member of the tree', () => {
    let treeData = [
      {
        "id": 1,
        title: "root node",
        description: "",
        "parentID": null
      }
    ];
    let tree = shallow(<Tree width={500} height={500} tree={treeData} />);

    let treeNodes = tree.find(TreeNode);

    expect(treeNodes.length).toEqual(1);
  });

  it('should render a link between a node and its child', () => {
    let treeData = [
      {
        "id": 1,
        title: "root node",
        description: "",
        "parentID": null
      },
      {
        "id": 2,
        title: "child node",
        "description": "3iuejfjf7739030407ejhe",
        "parentID": 1
      }
    ];
    let tree = shallow(<Tree width={500} height={500} tree={treeData} />);

    let links = tree.find('path');
    let treeNodes = tree.find(TreeNode);

    expect(links.length).toEqual(1);
    expect(links.at(0).key()).toEqual("root node -> child node");
  });

  it('should call its select node and on doubleclick callbacks when a node is double clicked', () => {
    let treeData = [
      {
        "id": 1,
        title: "root node",
        description: "",
        "parentID": null
      }
    ];
    let nodeSelectListener = jest.fn();
    let doubleClickListener = jest.fn();
    let tree = mount(
      <Tree
        width={500}
        height={500}
        tree={treeData}
        onNodeSelect={nodeSelectListener}
        onNodeDoubleClick={doubleClickListener}
      />
    );

    let treeNode = tree.find(TreeNode);
    treeNode.simulate('doubleClick');

    expect(nodeSelectListener).toHaveBeenCalledWith(1);
    expect(doubleClickListener).toHaveBeenCalled();
  });
});