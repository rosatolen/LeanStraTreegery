import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truncate: false,
      nodeData: props.data
    }
  }

  checkForTruncate = (element) => {
    let emsInPx = parseFloat(getComputedStyle(element).fontSize);
    let shouldTruncate = element.clientHeight > 3 * emsInPx;
    this.setState({
      truncate: shouldTruncate
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.state.nodeData) {
      this.setState({
        nodeData: nextProps.data
      });
    }
  }

  render = () => {
    let ellipseSvg = (
      <svg
        width={'2em'} height={'1em'}
        x={175} y={'3.5em'} >
        <defs>
          <linearGradient id='white_fade' >
            <stop offset='0%' stopColor='white' stopOpacity='0' />
            <stop offset='5%' stopColor='white' stopOpacity='.5' />
            <stop offset='40%' stopColor='white' stopOpacity='1' />
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill={'url(#white_fade)'} stroke='none' />
        <text y={'.8em'} x={'.7em'}>
          ...
        </text>
      </svg>
    );
    return (
      <svg width={this.props.width} height={this.props.height}
        x={this.state.nodeData.x - this.props.width / 2} y={this.state.nodeData.y}
        onDoubleClick={this.props.doubleClickListener.bind(this, this.state.nodeData.data)}
        className={'tree_node'}
      >
        <rect width={this.props.width} height={this.props.height} x={0} y={0} className='background_rect' />
        <svg width={this.props.width} height={this.props.height} x={0} y={0} >
          <text height='1em' y='1em' className={'title'} >
            {this.state.nodeData.data.title}
          </text>
          <foreignObject width={this.props.width} height={'3em'} y={'1.5em'} >
            <div className='svg_description'>
              <div ref={this.checkForTruncate}>
                {this.state.nodeData.data.description}
              </div>
            </div>
          </foreignObject>
          {this.state.truncate ? ellipseSvg : null}
        </svg>
        <rect width={this.props.width} height={this.props.height} x={0} y={0} className='bounding_rect' />
      </svg>
    );
  }
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