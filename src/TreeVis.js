import React, { Component } from 'react';
import vis from 'vis';

class TreeVis extends Component {
    constructor(props) {
        super();
        this.state = {
            data: {
                nodes:  new vis.DataSet(props.nodes.map(node => {
                    return {...node, label: node.title}
                })),
                edges:  new vis.DataSet(this.getEdges(props.nodes))
            }
        };
    };

    getEdges(nodes) {
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
        new vis.Network(element, this.state.data, options);
    }

    render() {
        return (
            <div>
                <div ref={this.createNetwork} style={{width: '600px', height: '600px'}}/>
            </div>
        );
    }
}

export default TreeVis;