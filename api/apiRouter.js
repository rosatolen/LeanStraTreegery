const express = require('express');
const TreeNode = require('./models/node');

const apiRouter = express.Router();
apiRouter.use((req, res, next) => {
  next();
});
apiRouter.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

apiRouter.route('/nodes')
  .post((req, res) => {
    const node = new TreeNode();
    node.title = req.body.title;
    node.description = req.body.description;
    node.parentId = req.body.parentId;

    node.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        message: `${node.title} created!`,
      });
    });
  })
  .get((req, res) => {
    TreeNode.find((err, nodes) => {
      if (err) {
        res.send(err);
      }

      res.json(nodes);
    });
  });

apiRouter.route('/nodes/:node_id')
  .get((req, res) => {
    TreeNode.findById(req.params.node_id, (err, node) => {
      if (err) {
        res.send(err);
      }
      res.json(node);
    });
  })
  .put((req, res) => {
    TreeNode.findById(req.params.node_id, (err, node) => {
      if (err) {
        res.send(err);
      }

      node.title = req.body.title;
      node.description = req.body.description;

      node.save((saveErr) => {
        if (saveErr) {
          res.send(saveErr);
        }

        res.json({
          message: 'updated node!',
        });
      });
    });
  })
  .delete((req, res) => {
    TreeNode.findByIdAndRemove(req.params.node_id, (err, node) => {
      if (err) {
        res.send(err);
      }
      const message = node ? `removed node ${node.title}` : 'Node not found';
      res.json({ message });
    });
  });

module.exports = apiRouter;
