import React from 'react';
import { shallow } from 'enzyme';
import Tree from '../../view_tree/Tree';
import TreeNode from '../../view_tree/TreeNode';

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