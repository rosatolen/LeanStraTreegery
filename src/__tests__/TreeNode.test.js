import React from 'react';
import { shallow } from 'enzyme';
import TreeNode from '../TreeNode';

it('should render a node and its KPIs', () => {
    let testTree = {
        "name": "Test Node",
        "KPI" : ["KPI1", "KPI2", "KPI3"],
        "children": []
    }

    let treeNode = shallow(<TreeNode node={testTree}/>)

    expect(treeNode.text()).toContain("Test Node:");
    expect(treeNode.text()).toContain("KPI1, KPI2, KPI3");
});

it('should render a tree node for each of its children', () => {
    let testTree = {
        "name": "Test Node",
        "KPI" : ["KPI1", "KPI2", "KPI3"],
        "children": [
            {
                "name": "First Child",
                "KPI" : ["child1KPI"],
                "children": []
            },
            {
                "name": "Second Child",
                "KPI" : ["child2KPI1"],
                "children": []
            }
        ]
    }

    let treeNode = shallow(<TreeNode node={testTree}/>);

    let childNodes = treeNode.find(TreeNode);
    expect(childNodes).toHaveLength(2);
    expect(childNodes.at(0).props().node).toEqual(testTree.children[0]);
    expect(childNodes.at(1).props().node).toEqual(testTree.children[1]);
});