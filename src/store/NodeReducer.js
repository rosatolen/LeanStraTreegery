import * as actions from './TreeActions.js';

let initialState = {
    nextNodeID: 1,
    nodes: []
};

function nodeReducer(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    switch (action.type) {
        case actions.ADD_NODE:
        console.log('Adding new node')
            return {...state,
                nodes: [...state.nodes,
                    {
                        id: state.nextNodeID,
                        title: action.title,
                        description: action.description,
                        parentID: action.parentID
                    }
                ],
                nextNodeID: state.nextNodeID + 1
            }

        case actions.DELETE_NODE:
            let nodeDescendants = getChildNodesOf(state.nodes, action.id);

            return {...state,
                nodes: state.nodes.filter(node => node.id !== action.id && !nodeDescendants.includes(node))
            };

        case actions.EDIT_NODE:
            let newState = {
                ...state,
                nodes: state.nodes.map(node => {
                    return {...node};
                })
            };
            let targetNode = newState.nodes.find(node => node.id === action.id);
            targetNode.title = action.title;
            targetNode.description = action.description;

            return newState;

        case actions.SELECT_NODE:
            return {
                ...state,
                selectedNodeID: action.id
            }

        default:
            return state;
    }
};

function getChildNodesOf(nodes, nodeId) {
    let children = nodes.filter(node => node.parentID === nodeId);   
    let descendants = [...children];

    children.forEach(child => {
        descendants.push(...getChildNodesOf(nodes, child.id));
    });

    return descendants;
}

export default nodeReducer;