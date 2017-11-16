import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from '../App';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should render a tree in a pre block', () => {
  let app = shallow(<App />);
  let pre = app.find('pre');
  expect(pre.text()).toContain('Big Picture Goal');
});
