# Tech Decisions:
## Webapp
This product is meant for many users to be able to access and get information about their companies strategy. The easiest way to disseminate this to large numbers of people is a web hosted app. Many of our devs are working on billable front end JS projects, and they will be able to bring their knowledge to this project, and build skills for their next client projects

## ReactJS
React was chosen as a common, well-supported framework for webapps. Also interest in it was expressed by people on the beach

## TravisCI and open source Github
These were used to minimize as much pipeline setup as possible.

## Redux javascript library
This was added to manage state

## Vis Library
This was added because of its tree visualization code. We took a look at Cytoscape.js, Sigma, Vis, and Tnt Tree and found Vis to be the best. Cytoscape could only make graphs and its documentation was annoying. Sigma's latest source code was broken. TnT Tree wasn't actively worked on.
