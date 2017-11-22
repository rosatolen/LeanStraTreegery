# Tech Decisions:
## Approach
* Webapp:
  * This product is meant for many users to be able to access and get information about their companies strategy. The easiest way to disseminate this to large numbers of people is a web hosted app.
  * Many of our devs are working on billable front end JS projects, and they will be able to bring their knowledge to this project, and build skills for their next client projects
* React:
  * Common, well-supported framework for webapps
  * Interest expressed by people on the beach

## Visualization libs to spike
* Cytoscape.js: http://js.cytoscape.org/
  * pretty simple to get running inside a react component
  * only works for graphs
  * documentation is a bit annoying
* Sigma: https://github.com/jacomyal/sigma.js
  * already has a react module!
  * latest release of source code is broken! They did a crap job of refactoring.
* Vis js: http://visjs.org/
  * Really simple to set up
  * multiple visualization options
  * Can use SVG as nodes to create formatted text in nodes -> react component?
    * Need to double check SVG browser support, but should be fine...
* TnT Tree: http://tntvis.github.io/tnt.tree/index.
