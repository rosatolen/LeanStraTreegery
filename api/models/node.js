let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let NodeSchema   = new Schema({
  id: Number,
  title: String,
  description: String,
  parentId: Number
});

module.exports = mongoose.model('Node', NodeSchema);