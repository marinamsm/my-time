
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project fields
let projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deleted: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Duplicate the ID field.
projectSchema.virtual('id').get(function(){
    return this._id; // .toHexString();
});

// Ensure virtual fields are serialised.
projectSchema.set('toJSON', {
    virtuals: true
});

var Project = module.exports = mongoose.model('Project', projectSchema);

module.exports.get = function (callback, limit) {
    Project.find(callback).limit(limit);
};