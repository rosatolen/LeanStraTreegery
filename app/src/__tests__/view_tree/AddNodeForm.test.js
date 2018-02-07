import React from 'react';
import { shallow, mount } from 'enzyme';
import AddNodeForm from '../../view_tree/AddNodeForm';

describe('AddNodeForm', () => {

  it('should update state when fields are edited', () => {
    let addNodeForm = shallow(<AddNodeForm />);
    let addNodeFormComponent = addNodeForm.instance();

    addNodeForm.find('#nodeTitle').simulate('change', {
      target: {
        name: 'title',
        value: 'a title'
      }
    });
    addNodeForm.find('#nodeDescription').simulate('change', {
      target: {
        name: 'description',
        value: 'a description'
      }
    });

    expect(addNodeFormComponent.state.title).toEqual('a title');
    expect(addNodeFormComponent.state.description).toEqual('a description');
  });

  it('should not call onSubmit callback when title is empty', () => {
    let onSubmit = jest.fn();
    let addNodeForm = shallow(<AddNodeForm onSubmit={onSubmit} />);
    let addNodeFormComponent = addNodeForm.instance();

    addNodeForm.find('#nodeDescription').simulate('change', {
      target: {
        name: 'description',
        value: 'a description'
      }
    });

    addNodeForm.find('#addAddNodeForm').simulate('submit', {
      preventDefault: jest.fn()
    });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit callback when title is not empty', () => {
    let onSubmit = jest.fn();
    let addNodeForm = shallow(<AddNodeForm onSubmit={onSubmit} />);
    let addNodeFormComponent = addNodeForm.instance();

    addNodeForm.find('#nodeDescription').simulate('change', {
      target: {
        name: 'title',
        value: 'some title'
      }
    });

    addNodeForm.find('#addAddNodeForm').simulate('submit', {
      preventDefault: jest.fn()
    });

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'some title',
      description: ''
    });
  });

  it('should clear fields after submitting', () => {
    let onSubmit = jest.fn();
    let addNodeForm = shallow(<AddNodeForm onSubmit={onSubmit} />);
    let addNodeFormComponent = addNodeForm.instance();

    addNodeForm.find('#nodeDescription').simulate('change', {
      target: {
        name: 'title',
        value: 'some title'
      }
    });

    addNodeForm.find('#addAddNodeForm').simulate('submit', {
      preventDefault: jest.fn()
    });

    expect(onSubmit).toHaveBeenCalled();
    expect(addNodeFormComponent.state.title).toEqual('');
    expect(addNodeFormComponent.state.description).toEqual('');
  });
});