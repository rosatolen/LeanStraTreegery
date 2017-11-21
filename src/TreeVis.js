import React, { Component } from 'react';
import vis from 'vis';

class TreeVis extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                nodes:  new vis.DataSet([
                    {id: 1, label: 'Node 1\nThis is a subtitleasd;lkjflakshdfkhaskjdhfkhaskldhfliuqweilfhakjsdhiuvhqwkehfk,asdlfhqklwefgkjahsdljhfgqlwebnfjqwhelfhawk.ehdfnqhwskljdfch?'},
                    {id: 2, label: 'Node 2'},
                    {id: 3, label: 'Node 3'},
                    {id: 4, label: 'Node 4'},
                    {id: 5, label: 'Node 5'}
                ]),
                // create an array with edges
                edges:  new vis.DataSet([
                    {from: 1, to: 3},
                    {from: 1, to: 2},
                    {from: 2, to: 4},
                    {from: 2, to: 5}
                ])
            }
        };
    };

    componentDidMount = () => {
        this.getContainer();
    }

    getContainer = () => {
        let container = document.getElementById('graphContainer');
        
        let options = {
            nodes: {
                shape: 'box'
            }
        }
        let network = new vis.Network(container, this.state.data, options);
    };

    render() {
        return (
            <div>
                <div id="graphContainer" style={{width: '600px', height: '600px'}}/>
            </div>
        );
    }
}

export default TreeVis;