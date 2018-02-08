# Tech Decisions:
## Webapp
This product is meant for many users to be able to access and get information about their companies strategy. The easiest way to disseminate this to large numbers of people is a web hosted app. Many of our devs are working on billable front end JS projects, and they will be able to bring their knowledge to this project, and build skills for their next client projects

## ReactJS
React was chosen as a common, well-supported framework for webapps. Also, interest in it was expressed by people on the beach

## TravisCI and open source Github
These were used to minimize as much pipeline setup as possible.

## Testing Libraries
JSDOM, Jest and enzyme. Jest comes with the create-react-app project generator. JSDOM is used to allow headless test runs.

## Redux javascript library
This was added to manage state.

## ~~Vis Library~~
~~This was added because of its tree visualization code. We took a look at Cytoscape.js, Sigma, Vis, and Tnt Tree and found Vis to be the best. Cytoscape could only make graphs and its documentation was annoying. Sigma's latest source code was broken. TnT Tree wasn't actively worked on.~~

## [D3.js](https://d3js.org/)
This library has a *steep* learning curve, and many of the resources and examples available are for the previous version, v3. That said, D3 is really powerful and will allow for more customization than the other libraries we've tried. It has a lot of options for visualization as well, so could allow for other ways of representing the trees in the future. 

### Some D3 resources:

[D3 Tips and Tricks v4.x](https://leanpub.com/d3-t-and-t-v4)

[D3 Hierarchy docs](https://github.com/d3/d3-hierarchy/blob/master/README.md)

[Animating with React, Redux, and d3](https://swizec.com/blog/animating-with-react-redux-and-d3/swizec/6775)

[Interactive Applications with React & D3](https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71)

[Building D3 Components with React](https://hackernoon.com/building-d3-components-with-react-7510e4743288)

## Backend
This is a work in progress. A very simple NodeJS server is used to host the app locally, and also to host a simple API.

The API provides basic CRUD endpoints for nodes, and uses [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) to store them.

### Backend Libraries:
- [Express](https://expressjs.com/)
- [Mongoose](http://mongoosejs.com/)