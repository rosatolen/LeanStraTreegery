import React from 'react';

function TreeNode(props) {

  let nodeData = props.data;
  return (
    <foreignObject x={nodeData.x} y={nodeData.y}>
      <div>{nodeData.data.title}</div>
    </foreignObject>
  );
}

export default TreeNode;