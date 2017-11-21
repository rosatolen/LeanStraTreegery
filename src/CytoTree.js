import React, { Component } from 'react';
import cytoscape from 'cytoscape';

class CytoTree extends Component {
    constructor() {
        super();
    }

    componentDidMount = () => {
        let element = document.getElementById('graphContainer');

        let cy = cytoscape({
            container: element,
            elements: [ // list of graph elements to start with
                { // node a
                  data: { id: 'a', text:'This is the node text for a' }
                },
                { // node b
                  data: { id: 'b' , text:'This is the node text for b\nI want this one to be longer'}
                },
                { // edge ab
                  data: { id: 'ab', source: 'a', target: 'b' }
                }
              ],
              style: [ // the stylesheet for the graph
                {
                  selector: 'node',
                  style: {
                    'background-color': 'black',
                    'width': 'label',
                    'height': 'label',
                    'padding': '10px',
                    'shape': 'rectangle',
                    'label': 'data(text)',
                    'text-wrap': 'wrap',
                    'color': 'red',
                    'text-halign': 'center',
                    'text-valign': 'center'
                  }
                },
                {
                  selector: 'edge',
                  style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'                  }
                }
              ],
              layout: {
                name: 'grid',
                rows: 1
              },
              userZoomingEnabled: false,
              panningEnabled: false
        });

        cy.on('tap', 'node', (event) => {
            let node = event.target;

            console.log( 'clicked node with id=' + node.id() + ' and text: ' + node.data('text'));
        });
        // eles.on('tap', 'node', (event) => {
        //     let node = event.target;

        //     console.log( 'clicked node with id=' + node.id() + ' and text: ' + node.data('text'));
        // });
        cy.add({
            data: { id: 'c', text:'This is the node text for c. I added this one manually!' }
          });
        cy.add({
            data: { id: 'ac', source: 'a', target: 'c' }
          });
    }

    render = () => {
        return <div id='graphContainer' style={{width:'600px', height:'600px'}}/>;
    }
}

export default CytoTree;