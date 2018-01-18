# Tech Decisions:
## Webapp
This product is meant for many users to be able to access and get information about their companies strategy. The easiest way to disseminate this to large numbers of people is a web hosted app. Many of our devs are working on billable front end JS projects, and they will be able to bring their knowledge to this project, and build skills for their next client projects

## ReactJS
React was chosen as a common, well-supported framework for webapps. Also interest in it was expressed by people on the beach

## TravisCI and open source Github
These were used to minimize as much pipeline setup as possible.

## Testing Libraries
JSDOM, Jest and enzyme. Jest comes with ReactJS. JSDOM can help test interaction with the app.

## Redux javascript library
This was added to manage state

## Vis Library
This was added because of its tree visualization code. We took a look at Cytoscape.js, Sigma, Vis, and Tnt Tree and found Vis to be the best. Cytoscape could only make graphs and its documentation was annoying. Sigma's latest source code was broken. TnT Tree wasn't actively worked on.

# Further Evaluation Needed:
## [D3.js](https://d3js.org/)
This library has a *steep* learning curve, and many of the resources and examples available are for the previous version, v3. That said, D3 is really powerful and will allow for more customization than the other libraries we've tried. It has a lot of options for visualization as well, so could allow for other ways of representing the trees in the future. More research and spiking is needed to decide if D3 is suitable for a beach project, due to the difficulty in getting up to speed on it.
