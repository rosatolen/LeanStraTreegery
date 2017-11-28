import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import TreeVis from '../TreeVis';

it('should render without crashing', () => {
    ReactDOM.render(
        <TreeVis nodes={[]} />,
        document.createElement('div')
    );
});

xit('should create vis nodes from the given nodes', () => {
    let testNodes = [{
            "id": 1,
            "title": "Big Picture Goal",
            "description": "",
            "KPI": []
        },
        {
            "id": 2,
            "title": "Maximize Profit",
            "description": "",
            "KPI": [],
            "parentID": 1
        }];

    let treeVis = shallow(<TreeVis nodes={testNodes} />).instance();

    expect(treeVis.state.data.nodes[1]).toEqual({...testNodes[0], label: testNodes[0].title});
});

it('should create edges from the given nodes', () => {
    let testNodes = [{
            "id": 1,
            "title": "Big Picture Goal",
            "description": "",
            "KPI": []
        },
        {
            "id": 2,
            "title": "Maximize Profit",
            "description": "",
            "KPI": [],
            "parentID": 1
        }];

    let treeVis = new TreeVis({nodes: testNodes});

    let edges = treeVis.getEdges(testNodes);

    expect(edges).toContainEqual({from: 1, to: 2});
});