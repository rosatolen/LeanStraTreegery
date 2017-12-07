import React from 'react';
import LabelFormatter from '../LabelFormatter';

it('should return a node title in bold', () => {
    let node = {
        id: 1,
        title: 'Node title'
    };

    let formatted = LabelFormatter.formatNodeLabel(node);

    expect(formatted).toEqual(`<b>${node.title}</b>`);
});

it('should append the node description in italics', () => {
    let node = {
        id: 1,
        title: 'Node title',
        description: 'Some description'
    };

    let formatted = LabelFormatter.formatNodeLabel(node);

    expect(formatted).toEqual(`<b>${node.title}</b>\n<i>${node.description}</i>`);
});

it('should preserve newlines in a node description', () => {
    let node = {
        id: 1,
        title: 'Node title',
        description: 'Some description.\nIt spans multiple lines\n\nSee?'
    };

    let formatted = LabelFormatter.formatNodeLabel(node);

    expect(formatted).toEqual(`<b>${node.title}</b>\n<i>Some description.</i>\n<i>It spans multiple lines</i>\n<i></i>\n<i>See?</i>`);
});