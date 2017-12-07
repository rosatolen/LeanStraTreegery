import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import TreeVis from '../TreeVis';
import LabelFormatter from '../LabelFormatter';

it('should render without crashing', () => {
    ReactDOM.render(
        <TreeVis nodes={[]} />,
        document.createElement('div')
    );
});

it('should create Vis datasets from the given nodes', () => {
    let testNodes = [{
            "id": 1,
            "title": "Big Picture Goal",
            "description": ""
        },
        {
            "id": 2,
            "title": "Maximize Profit",
            "description": "",
            "parentID": 1
        }];

    let treeVis = new TreeVis();

    let data = treeVis.createDatasetFromNodes(testNodes);
    expect(data.nodes.length).toEqual(2);
    expect(data.nodes.get(1)).toEqual({
        id: 1,
        label: LabelFormatter.formatNodeLabel(testNodes[0]),
        font: {
            multi: 'html'
        },
        group: 'vision'
    });
    expect(data.edges.length).toEqual(1);
    expect(data.edges.get()[0]).toHaveProperty('from', 1);
    expect(data.edges.get()[0]).toHaveProperty('to', 2);
});

it('should create add Vis nodes to the network from the given nodes', () => {
    let testNodes = [{
            "id": 1,
            "title": "Big Picture Goal",
            "description": ""
        },
        {
            "id": 2,
            "title": "Maximize Profit",
            "description": "",
            "parentID": 1
        }];

    let treeVis = mount(<TreeVis nodes={testNodes} />).instance();

    // There's no way to query the actual data in the network, so this test just makes sure that it's been added to it.
    let nodePositions = treeVis.network.getPositions([1,2]);
    expect(nodePositions['1']).toBeDefined();;
    expect(nodePositions['2']).toBeDefined();;
});

it('should create edges from the given nodes', () => {
    let testNodes = [{
            "id": 1,
            "title": "Big Picture Goal",
            "description": ""
        },
        {
            "id": 2,
            "title": "Maximize Profit",
            "description": "",
            "parentID": 1
        }];

    let treeVis = new TreeVis({nodes: testNodes});

    let edges = treeVis.getEdges(testNodes);

    expect(edges).toContainEqual({from: 1, to: 2});
});

it('should update the network dataset when new props are received', () => {
    let testNodes = [{
            "id": 1,
            "title": "Big Picture Goal",
            "description": ""
        },
        {
            "id": 2,
            "title": "Maximize Profit",
            "description": "",
            "parentID": 1
        }];

    let treeVis = mount(<TreeVis nodes={[...testNodes]} />).instance();

    let newNode = {
            "id": 3,
            "title": "Third Node",
            "description": "",
            "parentID": 2
    };

    treeVis.componentWillReceiveProps({nodes: [...testNodes, newNode]});

    let nodePositions = treeVis.network.getPositions([1, 2, 3]);
    expect(nodePositions['1']).toBeDefined();;
    expect(nodePositions['2']).toBeDefined();;
    expect(nodePositions['3']).toBeDefined();;
});

it('should assign vision group when node has no parent id', () => {
    let node = {
            "id": 1,
            "title": "Vision Node",
            "description": ""
    };

    let treeVis = new TreeVis();

    let data = treeVis.createDatasetFromNodes([node]);

    expect(data.nodes.get(1).group).toEqual('vision');
});

it('should assign goal group when node parent is in vision group', () => {
    let visionNode = {
            "id": 1,
            "title": "Goal Node",
            "description": ""
    };
    let goalNode = {
            "id": 2,
            "title": "Goal Node",
            "description": "",
            "parentID": 1
    };
    let treeVis = new TreeVis();

    let data = treeVis.createDatasetFromNodes([visionNode, goalNode]);
    
    expect(data.nodes.get(2).group).toEqual('goal');
});

it('should assign bet group when node parent is in goal group', () => {
    let visionNode = {
            "id": 1,
            "title": "Goal Node",
            "description": ""
    };
    let goalNode = {
            "id": 2,
            "title": "Goal Node",
            "description": "",
            "parentID": 1
    };
    let betNode = {
            "id": 3,
            "title": "Bet Node",
            "description": "",
            "parentID": 2
    };
    let treeVis = new TreeVis();

    let data = treeVis.createDatasetFromNodes([visionNode, goalNode, betNode]);
    
    expect(data.nodes.get(3).group).toEqual('bet');
});

it('should assign initiative group when node parent is in bet group', () => {
    let visionNode = {
            "id": 1,
            "title": "Goal Node",
            "description": ""
    };
    let goalNode = {
            "id": 2,
            "title": "Goal Node",
            "description": "",
            "parentID": 1
    };
    let betNode = {
            "id": 3,
            "title": "Goal Node",
            "description": "",
            "parentID": 2
    };
    let initiativeNode = {
            "id": 4,
            "title": "Initiative Node",
            "description": "",
            "parentID": 3
    };
    let treeVis = new TreeVis();

    let data = treeVis.createDatasetFromNodes([visionNode, goalNode, betNode, initiativeNode]);
    
    expect(data.nodes.get(4).group).toEqual('initiative');
});

it('should assign undefined group when node parent is in initiative group', () => {
    let visionNode = {
            "id": 1,
            "title": "Goal Node",
            "description": ""
    };
    let goalNode = {
            "id": 2,
            "title": "Goal Node",
            "description": "",
            "parentID": 1
    };
    let betNode = {
            "id": 3,
            "title": "Goal Node",
            "description": "",
            "parentID": 2
    };
    let initiativeNode = {
            "id": 4,
            "title": "Initiative Node",
            "description": "",
            "parentID": 3
    };
    let undefinedNode = {
            "id": 5,
            "title": "Undefined Node",
            "description": "",
            "parentID": 4
    }
    let treeVis = new TreeVis();

    let data = treeVis.createDatasetFromNodes([visionNode, goalNode, betNode, initiativeNode, undefinedNode]);
    
    expect(data.nodes.get(5).group).toBeUndefined;
});