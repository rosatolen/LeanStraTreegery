import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import vis from 'vis';
import '../App.css';
import LabelFormatter from './LabelFormatter';

class TreeVis extends Component {
    componentWillReceiveProps = (nextProps) => {
        if (!_.isEqual(nextProps.nodes, this.props.nodes)) {
            this.network.setData(this.createDatasetFromNodes(nextProps.nodes));
        }
    }

    createDatasetFromNodes = (nodes) => {
        let nodeSet = new vis.DataSet();
        nodes.forEach(node => {
            this.addNodeToDataset(node, nodeSet)
        });
        return {
                nodes:  nodeSet,
                edges:  new vis.DataSet(this.getEdges(nodes))
            };
    }

    addNodeToDataset = (node, nodeSet) => {
        let treeNode = {
            id: node.id,
            label: LabelFormatter.formatNodeLabel(node),
            font: {
                multi: 'html'
            },
            group: this.getNodeGroup(node, nodeSet)
        }
        nodeSet.add(treeNode);
    }

    getNodeGroup = (node, nodeSet) => {
        let parentGroup = undefined;
        if(node.parentID) {
            let parentNode = nodeSet.get(node.parentID);
            parentGroup = parentNode.group;
        }

        switch(parentGroup) {
            case 'vision':
                return 'goal';
            case 'goal':
                return 'bet';
            case 'bet':
                return 'initiative';
            case 'initiative':
                return undefined;
            case undefined:
                return 'vision';
            default:
                return;
        }
    }

    getEdges = (nodes) => {
        let edges = [];

        nodes.forEach(node => {
            nodes.filter(childNode => childNode.parentID === node.id).forEach(childNode => {
                edges.push({
                    from: node.id,
                    to: childNode.id
                });
            });
        });

        return edges;
    }

    createNetwork = (element) => {
        if(!element) {
            return;
        }

        let options = {
            nodes: {
                shape: 'box',
                fixed: {
                    y: true
                }
            },
            edges: {
                chosen: false
            },
            layout: {
                hierarchical: {
                    sortMethod: "directed",
                    nodeSpacing: 200,
                    levelSeparation: 75
                }
            },
            physics: {
                enabled: false
            },
            groups: {
                vision: {
                    color: 'rgba(36, 229, 97, 1)'
                },
                goal: {
                    color: 'rgba(36, 229, 97, .7)'
                },
                bet: {
                    color: 'rgba(36, 229, 97, .4)'
                },
                initiative: {
                    color: 'rgba(36, 229, 97, .1)'
                }
            }
        }
        let network = new vis.Network(element, this.createDatasetFromNodes(this.props.nodes), options);
        network.on('doubleClick', (event) => {
            if(event.nodes.length !== 0) {
                this.props.onNodeSelect(event.nodes[0]);
                this.props.onNodeDoubleClick();
            }
        });
        this.network = network;
    }

    render() {
        return (
            <div>
                <div ref={this.createNetwork} className='tree'/>
            </div>
        );
    }
}

TreeVis.propTypes = {
    nodes: PropTypes.array.isRequired,
    onNodeSelect: PropTypes.func,
    onNodeDoubleClick: PropTypes.func
}

export default TreeVis;