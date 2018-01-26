import reducer from '../../store/NodeReducer';
import * as actions from '../../store/TreeActions';

describe('NodeReducer', () => {

  let initialState = {
    nextNodeID: 1,
    nodes: []
  };

  it('should return the initial state if state is undefined', () => {
    let newState = reducer(undefined, {});

    expect(newState).toEqual({
      nextNodeID: 1,
      nodes: []
    });
  });

  it('should return the unmodified state when an unknown action is received', () => {
    let newState = reducer(
      initialState,
      {
        type: 'SOME_ACTION'
      }
    );

    expect(newState).toEqual(initialState);
  });

  it('should add a node when ADD_NODE action is received', () => {
    let nodeTitle = 'testNode';
    let nodeDescription = 'testDescription';
    let parentID = 2;
    let newState = reducer(
      initialState,
      actions.addNode(nodeTitle, nodeDescription, parentID)
    );

    expect(newState.nodes.length).toEqual(1);
    expect(newState.nodes[0]).toEqual({
      id: 1,
      title: nodeTitle,
      description: nodeDescription,
      parentID: parentID
    });
    expect(newState.nextNodeID).toEqual(2);
    expect(newState).not.toEqual(initialState);
  });

  it('should delete the given node when DELETE_NODE action is received', () => {
    let state = {
      nextNodeID: 4,
      nodes: [
        {
          id: 1,
          title: 'node1',
          description: 'description1',
          parentID: undefined
        },
        {
          id: 2,
          title: 'node2',
          description: 'description2',
          parentID: 1
        },
        {
          id: 3,
          title: 'node3',
          description: 'description3',
          parentID: 1
        }
      ]
    };

    let newState = reducer(state, actions.deleteNode(2));

    expect(newState.nodes.length).toEqual(2);
    expect(newState.nodes[0].id).toEqual(1);
    expect(newState.nodes[1].id).toEqual(3);
    expect(newState).not.toEqual(state);
  });

  it('should delete the children of node when DELETE_NODE action is received', () => {
    let state = {
      nextNodeID: 7,
      nodes: [
        {
          id: 1,
          title: 'node1',
          description: 'description1',
          parentID: undefined
        },
        {
          id: 2,
          title: 'node2',
          description: 'description2',
          parentID: 1
        },
        {
          id: 3,
          title: 'node3',
          description: 'description3',
          parentID: 2
        },
        {
          id: 4,
          title: 'node4',
          description: 'description4',
          parentID: 2
        },
        {
          id: 5,
          title: 'node5',
          description: 'description5',
          parentID: 3
        },
        {
          id: 6,
          title: 'node6',
          description: 'description6',
          parentID: 1
        }
      ]
    };

    let newState = reducer(state, actions.deleteNode(2));

    expect(newState.nodes.length).toEqual(2);
    expect(newState.nodes[0].id).toEqual(1);
    expect(newState.nodes[1].id).toEqual(6);
    expect(newState).not.toEqual(state);
  });

  it('should edit the title and description when EDIT_NODE action received', () => {
    let state = {
      nextNodeID: 2,
      nodes: [
        {
          id: 1,
          title: 'node1',
          description: 'description1',
          parentID: undefined
        }
      ]
    };

    let newState = reducer(state, actions.editNode(1, 'newTitle', 'newDescription'));

    expect(newState.nodes.length).toEqual(1);
    expect(newState.nodes[0].title).toEqual('newTitle');
    expect(newState.nodes[0].description).toEqual('newDescription');
    expect(newState).not.toEqual(state);
  });

  it('should update the selectedNode when given a SELECT_NODE action', () => {
    let state = {
      selectedNodeID: null,
      nodes: [
        {
          id: 1,
          title: 'node1',
          description: 'description1',
          parentID: undefined
        }
      ]
    };

    let newState = reducer(state, actions.selectNode(1));

    expect(newState.selectedNodeID).toEqual(1);
    expect(newState).not.toEqual(state);
  });

  it('should set the vision statement when given a SET_VISION action', () => {
    let state = {
      selectedNodeID: null,
      nodes: [],
      visionStatement: ""
    };

    let newState = reducer(state, actions.setVision("some vision statement"));

    expect(newState.visionStatement).toEqual("some vision statement");
    expect(newState).not.toEqual(state);
  });
});