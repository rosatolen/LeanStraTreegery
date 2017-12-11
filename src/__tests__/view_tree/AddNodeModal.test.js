import React from 'react';
import {shallow} from 'enzyme';
import ConnectedAddNodeModal, {AddNodeModal} from '../../view_tree/AddNodeModal';

it('should get a node with a given id', () => {
    let nodes = [
        {
            id: 0,
            title: 'zero'
        },
        {
            id: 1,
            title: 'one'
        },
        {
            id: 2,
            title: 'two'
        },
    ];

    let modal = shallow(
        <AddNodeModal
            parentNodeId={1}
            isOpen={false}
            onSubmit={jest.fn()}
            nodes={nodes}
        />
    );

    expect(modal.instance().getNodeWithId(1)).toEqual(nodes[1]);
});

it('should update state when given a new parentID', () => {
    let nodes = [
        {
            id: 0,
            title: 'zero'
        },
        {
            id: 1,
            title: 'one'
        },
        {
            id: 2,
            title: 'two'
        },
    ];
    let modal = shallow(
        <AddNodeModal
            parentNodeId={1}
            isOpen={false}
            onSubmit={jest.fn()}
            nodes={nodes}
        />
    );

    modal.instance().componentWillReceiveProps({parentNodeId: 2});

    expect(modal.instance().state.parentNode).toEqual(nodes[2]);
});

it('should call onSubmit and onClose callbacks when given form data', () => {
    let onSubmit = jest.fn();
    let onClose = jest.fn();
    let formData = {
        title: 'title',
        description: 'desc'
    };
    let modal = shallow(
        <AddNodeModal
            parentNodeId={0}
            isOpen={false}
            onSubmit={onSubmit}
            nodes={[]}
            onClose={onClose}
        />
    );

    modal.instance().onFormSubmit(formData);

    expect(onSubmit).toHaveBeenCalledWith(formData);
    expect(onClose).toHaveBeenCalled();
});