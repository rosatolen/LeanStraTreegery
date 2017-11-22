import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import vis from 'vis';
import { VisNodeSVG } from './VisNodeSVG';
import LabelFormatter from './LabelFormatter';

class TreeVis extends Component {
    constructor() {
        super();
        this.state = {
            nextID: 7,
            data: {
                nodes:  new vis.DataSet([
                    {id: 1, label: 'Node 1\nThis is an unformatted subtitle'},
                    {
                        id: 2,
                        label: LabelFormatter.createLabel('Label 2', "Label 2's really long subtitle!\nwith newlines! dlfkajsdflkajsdf;lasldkfjas;ldkfj;laskdfj\nas;ldkfjas;lkdfj;laksdjf;lkajsd;lfkjas;ldkfj;asdklfj\naslkdfj;lasdkjf;lasdkjf;lkj"),
                        font: {
                            multi: 'html'
                        }
                    },
                    {id: 3, label: LabelFormatter.createLabel('Node 3'),
                        font: {
                            multi: 'html'
                        }
                    },
                    {id: 4, label: 'Node 4'},
                    {id: 5, label: 'Node 5'},
                    {
                        id: 6,
                        label: '',
                        image: this.encodeTemplate(VisNodeSVG({
                            data: {id: 6, label: 'Node 2'}
                        })),
                        shape: 'image'
                    }
                ]),
                // create an array with edges
                edges:  new vis.DataSet([
                    {from: 1, to: 3},
                    {from: 1, to: 2},
                    {from: 2, to: 4},
                    {from: 2, to: 5},
                    {from: 2, to: 6}
                ])
            }
        };
    };

    componentDidMount = () => {
        this.initializeGraph();
    }

    encodeTemplate = (template) => {
        let templateString = ReactDOMServer.renderToStaticMarkup(template);
        return "data:image/svg+xml;charset=utf-8,"+ encodeURIComponent(templateString);
    }

    initializeGraph = () => {
        let container = document.getElementById('graphContainer');

        let options = {
            nodes: {
                shape: 'box'
            }
        }

        new vis.Network(container, this.state.data, options);
    };

    addNode = () => {
        let newNode = {
            id: this.state.nextID,
            label: LabelFormatter.createLabel("New Node: " + this.state.nextID),
            font: {
                multi: 'html'
            }
        }
        let newEdge = {from: 2, to:newNode.id};

        this.state.data.nodes.add(newNode);
        this.state.data.edges.add(newEdge);
        this.setState({
                nextID: this.state.nextID + 1
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.addNode}>Add Node!</button>
                <div id="graphContainer" style={{width: '600px', height: '600px'}}/>
            </div>
        );
    }
}

export default TreeVis;