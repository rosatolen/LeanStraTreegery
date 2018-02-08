const TreeNode = require('./node');

class NodeController {
  createNode(req, res) {
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
  }

  getAllNodes(req, res) {
    TreeNode.find((err, nodes) => {
      if (err) {
        res.send(err);
      }

      res.json(nodes);
    });
  }

  getNodeById(req, res) {
    TreeNode.findById(req.params.node_id, (err, node) => {
      if (err) {
        res.send(err);
      }
      res.json(node);
    });
  }

  updateNode(req, res) {
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
  }

  deleteNode(req, res) {
    TreeNode.findByIdAndRemove(req.params.node_id, (err, node) => {
      if (err) {
        res.send(err);
      }
      const message = node ? `removed node ${node.title}` : 'Node not found';
      res.json({ message });
    });
  }
};

module.exports = NodeController;