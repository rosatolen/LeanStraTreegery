import React from 'react';
import PropTypes from 'prop-types'
import './App.css';

export const TreeNode = ({nodes, rootNodeID, onNodeClick}) => {
    let rootNode = nodes.find(node => node.id === rootNodeID) || {};

    let onNameClicked = () => {
        onNodeClick(rootNodeID);
    }

    return (
        <div>
            <a onClick={onNameClicked} className="Clickable">{rootNode.title}</a>: &nbsp; {rootNode.KPI.join(', ')}
            {nodes.filter(node => node.parentID === rootNodeID).map((childNode) => {
                    return (
                        <div key={childNode.id} className="ChildNode">
                            <TreeNode nodes={nodes} rootNodeID={childNode.id} onNodeClick={onNodeClick}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

TreeNode.propTypes = {
    nodes: PropTypes.array.isRequired,
    rootNodeID: PropTypes.number.isRequired,
    onNodeClick: PropTypes.func
};

export default TreeNode;