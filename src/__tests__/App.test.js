import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import {createStore} from 'redux';
import {App} from '../App';
import TreeVis from '../TreeVis';

let nodes;
beforeEach(() => {
  nodes = [{
    "id": 1,
    "title": "Big Picture Goal",
    "description": "",
    "KPI": []
  }];
})

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
      <App tree={nodes} rootNodeID={1}/>,
    div
  );
});

it('should render a TreeVis component', () => {
  let app = shallow(<App tree={nodes} rootNodeID={1}/>);
  let treeVis = app.find(TreeVis);

  expect(treeVis.exists()).toBe(true);
});
