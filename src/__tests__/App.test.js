import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import store from '../store/AppStore';
import ConnectedApp, {App} from '../App';
import TreeVis from '../view_tree/TreeVis';

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
  let div = document.createElement('div');
  ReactDOM.render(
    (<Provider store={store}>
      <ConnectedApp tree={nodes}/>
    </Provider>),
    div
  );
});

it('should render a TreeVis component when given a tree', () => {
  let app = shallow(<App tree={nodes}/>);
  let treeVis = app.find(TreeVis);

  expect(treeVis.exists()).toBe(true);
});

it('should show Create Tree button when the tree is empty', () => {
  let app = shallow(<App tree={[]}/>);
  let treeVis = app.find(TreeVis);
  let createTreeButton = app.find('button');

  expect(treeVis.exists()).toBe(false);
  expect(createTreeButton.text()).toBe('Create a tree');
});