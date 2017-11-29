import React, { Component } from 'react';
import PropTypes from 'prop-types';
import vis from 'vis';

class TreeVis extends Component {
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.nodes !== this.props.nodes) {
                this.network.setData(this.createDatasetFromNodes(nextProps.nodes));
        }
    }

    createDatasetFromNodes = (nodes) => {
        return {
                nodes:  new vis.DataSet(nodes.map(node => {
                    return {...node, label: node.title}
                })),
                edges:  new vis.DataSet(this.getEdges(nodes))
            };
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
        let options = {
            nodes: {
                shape: 'box',
                fixed: true
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
            }
        }
        let network = new vis.Network(element, this.createDatasetFromNodes(this.props.nodes), options);
        network.on('select', (event) => {
            if(event.nodes.length === 0) {
                this.props.onNodeSelect(-1);
            } else {
                this.props.onNodeSelect(event.nodes[0]);
            }
        });
        this.network = network;
    }

    render() {
        return (
            <div>
                <div ref={this.createNetwork} style={{width: '600px', height: '600px'}}/>
            </div>
        );
    }
}

TreeVis.propTypes = {
    nodes: PropTypes.array.isRequired,
    onNodeSelect: PropTypes.func
}

export default TreeVis;