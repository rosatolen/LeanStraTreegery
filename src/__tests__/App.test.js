import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { shallow } from 'enzyme';
import store from '../store/AppStore';
import ConnectedApp, {App} from '../App';
import TreeVis from '../view_tree/TreeVis';
import FormModal from '../view_tree/FormModal';
import AddNodeForm from '../view_tree/AddNodeForm';
import AddVisionForm from '../view_tree/AddVisionForm';

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
  let app = shallow(<App tree={nodes} visionStatement={""}/>);
  let treeVis = app.find(TreeVis);

  expect(treeVis.exists()).toBe(true);
});

it('should show Add a goal button when the tree is empty', () => {
  let app = shallow(<App tree={[]} visionStatement={""}/>);
  let treeVis = app.find(TreeVis);
  let createTreeButton = app.findWhere(button => button.type() === 'button' && button.text() === 'Add a goal');

  expect(treeVis.exists()).toBe(false);
  expect(createTreeButton.exists()).toBe(true);
});

it('should show a modal Add Node form when the Add a goal button is clicked', () => {
  let app = shallow(
    <App
      tree={[]}
      selectedNode={-1}
      visionStatement={""}
    />
  );
  
  let addGoalButton = app.findWhere(button => button.type() === 'button' && button.text() === 'Add a goal');
  addGoalButton.simulate('click', {
    preventDefault: jest.fn()
  });

  let addNodeModal = app.find(FormModal);

  expect(addNodeModal.exists()).toBe(true);
  expect(addNodeModal.find(AddNodeForm).exists()).toBe(true);
});

it('should display add vision statement button when statement is empty', () => {
  let app = shallow(
    <App
      tree={[]}
      selectedNode={-1}
      visionStatement={""}
    />
  );

  let createVisionButton = app.findWhere(button => button.type() === 'button' && button.text() === "Add a vision");

  expect(createVisionButton.exists()).toBe(true);
});

it('should display vision statement when statement is present', () => {
  let visionStatement = "Some vision statement"
  let app = shallow(
    <App
      tree={[]}
      selectedNode={-1}
      visionStatement={visionStatement}
    />
  );

  let createVisionButton = app.findWhere(button => button.type() === 'button' && button.text() === "Add a vision");
  let visionHeader = app.findWhere(elem => elem.type() === 'h1' && elem.text() === visionStatement );
  expect(createVisionButton.exists()).toBe(false);
  expect(visionHeader.exists()).toBe(true);
});

it('should show the set vision modal when the Add a vision button is clicked', () => {
  let app = shallow(
    <App
      tree={[]}
      selectedNode={-1}
      visionStatement={""}
    />
  );
  
  let addVisionButton = app.findWhere(button => button.type() === 'button' && button.text() === 'Add a vision');
  addVisionButton.simulate('click', {
    preventDefault: jest.fn()
  });

  let addVisionModal = app.find(FormModal);

  expect(addVisionModal.exists()).toBe(true);
  expect(addVisionModal.find(AddVisionForm).exists()).toBe(true);
});

it('should call the set vision action  when set vision form is submitted', () => {
  let setVisionAction = jest.fn();

  let app = shallow(
    <App
      tree={[]}
      selectedNode={-1}
      visionStatement={""}
      setVision={setVisionAction}
    />
  );

  app.instance().setVision({
    vision: "some vision statement"
  });

  expect(setVisionAction).toHaveBeenCalledWith("some vision statement");
});

it('should get the node corresponding to a given ID', () => {
  let app = shallow(
    <App
      tree={nodes}
      selectedNode={-1}
      visionStatement={""}
    />
  );

  let selectedNode = app.instance().getNodeWithId(1);

  expect(selectedNode).toBe(nodes[0]);
});

it('should return an undefined node if the given ID cannot be found', () => {
  let app = shallow(
    <App
      tree={nodes}
      selectedNode={-1}
      visionStatement={""}
    />
  );

  let selectedNode = app.instance().getNodeWithId(15);

  expect(selectedNode).toBeUndefined();
});