import React from 'react';
import PropTypes from 'prop-types';

function TreeNode(props) {
  let nodeData = props.data;

  return (
    <foreignObject width={props.width} height={props.height} x={nodeData.x - props.width / 2} y={nodeData.y}>
      <div>{nodeData.data.title}</div>
    </foreignObject>
  );
}

TreeNode.defaultProps = {
  width: 200,
  height: 100
};
TreeNode.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};
export default TreeNode;