import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
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
