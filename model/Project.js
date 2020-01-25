
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

var Project = module.exports = mongoose.model('Project', projectSchema);

module.exports.get = function (callback, limit) {
    Project.find(callback).limit(limit);
};