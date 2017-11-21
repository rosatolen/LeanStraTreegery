import React from 'react';
import './App.css';

export const TreeNode = (props) => {
    let onNameClicked = () => {
        props.onNodeClick(props.node);
    }

    return (
        <div>
            <a onClick={onNameClicked} className="Clickable">{props.node.name}</a>: &nbsp; {props.node.KPI.join(', ')}
            {props.node.children.map((childNode) => {
                    return (
                        <div key={childNode.name} className="ChildNode">
                            <TreeNode node={childNode} onNodeClick={props.onNodeClick}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default TreeNode;