import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

function TreeNode(props) {
  let nodeData = props.data;

  return (
    <g
      width={props.width}
      height={props.height}
      onDoubleClick={props.doubleClickListener.bind(this, nodeData.data)}
      className={'tree_node'} >
      <rect
        width={props.width}
        height={props.height}
        x={nodeData.x - props.width / 2}
        y={nodeData.y}
      />
      <foreignObject
        width={props.width}
        height={props.height}
        x={nodeData.x - props.width / 2}
        y={nodeData.y} >
        <div className={'title'}>
          {nodeData.data.title}
        </div>
      </foreignObject>
    </g>
  );
}

TreeNode.defaultProps = {
  width: 200,
  height: 100,
  doubleClickListener: () => { }
};
TreeNode.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  doubleClickListener: PropTypes.func
};
export default TreeNode;