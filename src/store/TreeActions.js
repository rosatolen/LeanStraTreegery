export const ADD_NODE = 'ADD_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const EDIT_NODE = 'EDIT_NODE';
export const SELECT_NODE = 'SELECT_NODE';

export function addNode(title, description, parentID) {
    return {
        type: ADD_NODE,
        title: title,
        description: description,
        parentID: parentID
    }
}

export function deleteNode(nodeID) {
    return {
        type: DELETE_NODE,
        id: nodeID
    }
}

export function editNode(nodeID, title, description) {
    return {
        type: EDIT_NODE,
        title: title,
        description: description,
        id: nodeID
    }
}

export function selectNode(nodeID) {
    return {
        type: SELECT_NODE,
        id: nodeID
    }
}

export default {
    addNode: addNode,
    deleteNode: deleteNode,
    editNode: editNode,
    selectNode: selectNode
};