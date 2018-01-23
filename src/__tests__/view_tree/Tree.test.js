import React from 'react';
import { shallow } from 'enzyme';
import Tree from '../../view_tree/Tree';
import TreeNode from '../../view_tree/TreeNode';

it('should render a node for each member of the tree', () => {
  let treeData = {
      title: "root node",
      children: []
    }
  let tree = shallow(<Tree width={500} height={500} tree={treeData}/>);

  let treeNodes = tree.find(TreeNode);

  expect(treeNodes.length).toEqual(1);
});

it('should render a link between a node and its child', () => {
  let treeData = {
      title: "root node",
      children: [
        {
          title: "child node"
        }
      ]
    }
  let tree = shallow(<Tree width={500} height={500} tree={treeData}/>);

  let links = tree.find('path');
  let treeNodes = tree.find(TreeNode);

  expect(links.length).toEqual(1);
  expect(links.at(0).key()).toEqual("root node -> child node");
});