var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gaqSchema = new Schema({  
    value: String
});


module.exports = mongoose.model('gaq', gaqSchema);