import React, { Children } from 'react';
import {shallow} from 'enzyme';
import FormModal from '../../view_tree/FormModal';

it('should set an onSubmit callback for each child form', () => {
    let onSubmit = jest.fn();
    let onClose = jest.fn();
    let formData = {
        title: 'title',
        description: 'desc'
    };
    let childElement = <div/>;
    let modal = shallow(
        <FormModal
            onSubmit={onSubmit}
            onClose={onClose}
        >
            <div />
            <div />
            <div />
        </FormModal>
    );

    let childForms = modal.find('.modal_contents');

    expect(childForms.length).toBe(3);
    childForms.forEach(elementWrapper => {
        expect(elementWrapper.get(0).props.onSubmit).toBeDefined();
    });
});

it('should call onSubmit and onClose callbacks when given form data', () => {
    let onSubmit = jest.fn();
    let onClose = jest.fn();
    let formData = {
        title: 'title',
        description: 'desc'
    };
    let childElement = <div/>;
    let modal = shallow(
        <FormModal
            onSubmit={onSubmit}
            onClose={onClose}
        >
            <div id="test"/>
        </FormModal>
    );

    modal.find('#test').get(0).props.onSubmit(formData);

    expect(onSubmit).toHaveBeenCalledWith(formData);
    expect(onClose).toHaveBeenCalled();
});

it('should title modal with given title', () => {
    let onSubmit = jest.fn();
    let onClose = jest.fn();
    let modal = shallow(
        <FormModal
            title="Modal Title"
            onSubmit={onSubmit}
            onClose={onClose}
        />
    );

    let header = modal.find('.header');

    expect(header.text()).toEqual('Modal Title');
});