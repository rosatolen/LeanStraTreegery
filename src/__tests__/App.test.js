import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { TreeNode } from '../TreeNode';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should render a TreeNode', () => {
  let app = shallow(<App />);
  let treeNode = app.find(TreeNode);

  expect(treeNode).not.toBeNull();
});

it('should update state when given a new node', () => {
  // mount component and get instance of the React Class that defines it
  let appComponent = shallow(<App/>).instance();
  let newNode = {
    name: 'new node',
    KPI: [],
    children: []
  };

  appComponent.updateCurrentNode(newNode);

  expect(appComponent.state.currentNode).toEqual(newNode);
  expect(appComponent.state.previousNodes).toHaveLength(1);
  expect(appComponent.state.previousNodes[0]).toEqual(appComponent.state.tree);
});

it('should update state when given the same node', () => {
  let appComponent = shallow(<App/>).instance();

  appComponent.updateCurrentNode(appComponent.state.tree);

  expect(appComponent.state.currentNode).toEqual(appComponent.state.tree);
  expect(appComponent.state.previousNodes).toHaveLength(0);
});

it('should pop the previous node stack to update state', () => {
  let appComponent = shallow(<App/>).instance();
  let newNode = {
    name: 'new node',
    KPI: [],
    children: []
  };

  appComponent.updateCurrentNode(newNode);
  appComponent.goBack();

  expect(appComponent.state.currentNode).toEqual(appComponent.state.tree);
  expect(appComponent.state.previousNodes).toHaveLength(0);
});

it('should not show the Go Back link when there are no previous nodes', () => {
  let appComponent = shallow(<App/>).instance();
  let backButton = appComponent.showGoBackButton();

  expect(appComponent.state.previousNodes).toHaveLength(0);
  expect(backButton).toBeNull();
});

it('should show the Go Back link when there is a previous node', () => {
  let appComponent = shallow(<App/>).instance();
  let newNode = {
    name: 'new node',
    KPI: [],
    children: []
  };

  appComponent.updateCurrentNode(newNode);
  let backButton = appComponent.showGoBackButton();

  expect(backButton).not.toBeNull();
});

it('should update when a child node is clicked', () => {
  //fully render the Component in a virtual DOM, including it's children
  let app = mount(<App/>);
  let appComponent = app.instance();
  let treeNodes = app.find(TreeNode);
  let newNode = appComponent.state.tree.children[0]; //TODO: get rid of this when App.js doesn't load state from json file

  app.find('a').filterWhere((element) => {
    return element.text() == newNode.name;
  }).simulate('click');

  let topMostNode = app.find(TreeNode).at(0).getElement();
  expect(topMostNode.props.node).toEqual(newNode);
  expect(appComponent.state.previousNodes).toHaveLength(1);
  expect(appComponent.state.previousNodes[0]).toEqual(appComponent.state.tree);
});

it('should update state when the go back button is clicked', () => {
  let app = mount(<App/>);
  let appComponent = app.instance();
  let treeNodes = app.find(TreeNode);
  let newNode = appComponent.state.tree.children[0]; //TODO: get rid of this when App.js doesn't load state from json file

  app.find('a').filterWhere((element) => {
    return element.text() == newNode.name;
  }).simulate('click');
  app.find('.NavButton').find('.Clickable').simulate('click');

  let topMostNode = app.find(TreeNode).at(0).getElement();

  expect(topMostNode.props.node).toEqual(appComponent.state.tree);
});