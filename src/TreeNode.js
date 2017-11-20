import React from 'react';

export const TreeNode = (props) => {
    let childStyle = {
        margin: "0 0 0 20px"
    };

    return (
        <div>
            {props.node.name}: &nbsp; {props.node.KPI.join(', ')}
            {props.node.children.map((childNode) => {
                    return (
                        <div style={childStyle} key={childNode.name}>
                            <TreeNode node={childNode}/>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default TreeNode;