import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { shallow, mount } from 'enzyme';
import {createStore} from 'redux';
import {App} from '../App';
import TreeNode from '../TreeNode';

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

it('should render a TreeNode', () => {
  let app = shallow(<App tree={nodes} rootNodeID={1}/>);
  let treeNode = app.find(TreeNode);

  expect(treeNode).not.toBeNull();
});

it('should update state when given a new root node', () => {
  // mount component and get instance of the React Class that defines it
  let appComponent = shallow(<App tree={nodes} rootNodeID={1}/>).instance();
  let newNode = {
    name: 'new node',
    KPI: [],
    children: []
  };

  appComponent.updateRootNode(5);

  expect(appComponent.state.currentRootNode).toEqual(5);
  expect(appComponent.state.previousRootNodes).toHaveLength(1);
  expect(appComponent.state.previousRootNodes).toEqual([1]);
});

it('should update state when given the same node', () => {
  let appComponent = shallow(<App tree={nodes} rootNodeID={1}/>).instance();

  appComponent.updateRootNode(1);

  expect(appComponent.state.currentRootNode).toEqual(1);
  expect(appComponent.state.previousRootNodes).toHaveLength(0);
});

it('should pop the previous node stack to update state', () => {
  let appComponent = shallow(<App tree={nodes} rootNodeID={1}/>).instance();
  let newNode = {
    name: 'new node',
    KPI: [],
    children: []
  };

  appComponent.updateRootNode(3);
  appComponent.goBack();

  expect(appComponent.state.currentRootNode).toEqual(1);
  expect(appComponent.state.previousRootNodes).toHaveLength(0);
});

it('should not show the Go Back link when there are no previous nodes', () => {
  let appComponent = shallow(<App tree={nodes} rootNodeID={1}/>).instance();
  let backButton = appComponent.showGoBackButton();

  expect(appComponent.state.previousRootNodes).toHaveLength(0);
  expect(backButton).toBeNull();
});

it('should show the Go Back link when there is a previous node', () => {
  let appComponent = shallow(<App tree={nodes} rootNodeID={1}/>).instance();

  appComponent.updateRootNode(2);
  let backButton = appComponent.showGoBackButton();

  expect(backButton).not.toBeNull();
});

it('should update when a child node is clicked', () => {
  //fully render the Component in a virtual DOM, including it's children
  let newNode = {
    "id": 2,
    "title": "node 2",
    "description": "some description2",
    "KPI": [],
    "parentID": 1
  };
  nodes.push(newNode);

  let app = mount(<App tree={nodes} rootNodeID={1}/>);
  let appComponent = app.instance();
  let treeNodes = app.find(TreeNode);

  app.find('a').filterWhere((element) => {
    return element.text() == newNode.title;
  }).simulate('click');

  let topMostNode = app.find(TreeNode).at(0).getElement();
  expect(topMostNode.props.rootNodeID).toEqual(newNode.id);
  expect(appComponent.state.previousRootNodes).toHaveLength(1);
  expect(appComponent.state.previousRootNodes).toEqual([1]);
});

it('should update state when the go back button is clicked', () => {
  let newNode = {
    "id": 2,
    "title": "node 2",
    "description": "some description2",
    "KPI": [],
    "parentID": 1
  };
  nodes.push(newNode);

  let app = mount(<App tree={nodes} rootNodeID={1}/>);
  let appComponent = app.instance();
  let treeNodes = app.find(TreeNode);

  app.find('a').filterWhere((element) => {
    return element.text() == newNode.title;
  }).simulate('click');
  app.find('.NavButton').find('.Clickable').simulate('click');

  let topMostNode = app.find(TreeNode).at(0).getElement();

  expect(topMostNode.props.rootNodeID).toEqual(1);
});