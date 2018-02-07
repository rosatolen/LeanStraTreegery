const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const TreeNode = require('./api/models/node');

const dbConnectString = process.env.CONN_STRING || 'mongodb://localhost:27017/LeanStratreegery';
mongoose.connect(dbConnectString);
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'app/build')));

const port = process.env.PORT || 5000;

const router = express.Router();

router.use((req, res, next) => {
  next();
});
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/nodes')
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

router.route('/nodes/:node_id')
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
app.use('/api', router);

app.listen(port);
console.log(`Listening on port ${port}`);
