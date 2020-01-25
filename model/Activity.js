
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project fields
let activitySchema = new Schema({
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
    },deleted: {
        type: Boolean
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Activity = module.exports = mongoose.model('Activity', activitySchema);

module.exports.get = function (callback, limit) {
    Activity.find(callback).limit(limit);
};