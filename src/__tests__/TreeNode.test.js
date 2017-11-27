import React from 'react';
import { shallow } from 'enzyme';
import TreeNode from '../TreeNode';

it('should render a node and its KPIs', () => {
    let testNodes = [{
        "id": 1,
        "title": "Test Node",
        "description": "",
        "KPI" : ["KPI1", "KPI2", "KPI3"],
        "children": []
    }]

    let treeNode = shallow(<TreeNode nodes={testNodes} rootNodeID={1}/>);

    expect(treeNode.text()).toContain("Test Node:");
    expect(treeNode.text()).toContain("KPI1, KPI2, KPI3");
});

it('should render a tree node for each of its children', () => {
    let testNodes = [{
            "id": 1,
            "title": "Test Node",
            "description": "",
            "KPI": ["KPI1", "KPI2", "KPI3"],
        },
        {
            "id": 2,
            "title": "First Child",
            "description": "",
            "KPI": ["child1KPI"],
            "parentID": 1,
            "children": []
        },
        {
            "id": 3,
            "title": "Second Child",
            "description": "",
            "KPI": ["child2KPI1"],
            "parentID": 1,
            "children": []
        }
    ];

    let treeNode = shallow(<TreeNode nodes={testNodes} rootNodeID={1}/>);

    let childNodes = treeNode.find(TreeNode);
    expect(childNodes).toHaveLength(2);
    expect(childNodes.at(0).props().rootNodeID).toEqual(2);
    expect(childNodes.at(1).props().rootNodeID).toEqual(3);
});