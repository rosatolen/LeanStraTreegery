import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truncateTitle: false,
      truncateDescription: false,
      nodeData: props.data
    }
  }

  checkTitleForTruncate = (element) => {
    let emsInPx = parseFloat(getComputedStyle(element).fontSize);
    let shouldTruncate = element.clientHeight > 2 * emsInPx;
    this.setState({
      truncateTitle: shouldTruncate
    });
  }

  checkDescriptionForTruncate = (element) => {
    let emsInPx = parseFloat(getComputedStyle(element).fontSize);
    let shouldTruncate = element.clientHeight > 3 * emsInPx;
    this.setState({
      truncateDescription: shouldTruncate
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data !== this.state.nodeData) {
      this.setState({
        nodeData: nextProps.data
      });
    }
  }

  createEllipseSvg = (yPos) => {
    return (
      <svg
        width={'2em'} height={'1em'}
        x={'87.5%'} y={yPos} className='truncation'>
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
  }

  render = () => {
    let titleEllipse = this.createEllipseSvg('1em');
    let ellipseSvg = this.createEllipseSvg('4.5em');
    return (
      <svg width={this.props.width} height={this.props.height}
        x={this.state.nodeData.x - this.props.width / 2} y={this.state.nodeData.y}
        onDoubleClick={this.props.doubleClickListener.bind(this, this.state.nodeData.data)}
        className={'tree_node'}
      >
        <rect width={this.props.width} height={this.props.height} x={0} y={0} className='background_rect' />
        <svg width={this.props.width} height={this.props.height} x={0} y={'.5em'} >
          <foreignObject width={this.props.width} height={'2em'} >
            <div className='title'>
              <div ref={this.checkTitleForTruncate}>
                {this.state.nodeData.data.title}
              </div>
            </div>
          </foreignObject>
          {this.state.truncateTitle ? titleEllipse : null}
          <foreignObject width={this.props.width} height={'3em'} y={'2.5em'} >
            <div className='svg_description'>
              <div ref={this.checkDescriptionForTruncate}>
                {this.state.nodeData.data.description}
              </div>
            </div>
          </foreignObject>
          {this.state.truncateDescription ? ellipseSvg : null}
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