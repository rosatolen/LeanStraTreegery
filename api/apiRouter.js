const express = require('express');
const NodeController = require('./tree_nodes/nodeController');

const apiRouter = express.Router();
const nodeController = new NodeController();
apiRouter.use((req, res, next) => {
  next();
});
apiRouter.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

apiRouter.route('/nodes')
  .post(nodeController.createNode)
  .get(nodeController.getAllNodes);

apiRouter.route('/nodes/:node_id')
  .get(nodeController.getNodeById)
  .put(nodeController.updateNode)
  .delete(nodeController.deleteNode);

module.exports = apiRouter;
