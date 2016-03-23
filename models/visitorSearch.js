var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var visitorSchema = new Schema({  
    createdTimeStamp: { type: Date, required: true },
    zipCode: String,
    searchTerm: String,
    ipAddress: String
});

visitorSchema.pre("validate", function (next) {
    //We do this here to ensure we always get an udpated value even if someone explicitly sends it in update
    this.createdTimeStamp = new Date();
    return next();
});


module.exports = mongoose.model('Visitor', visitorSchema);