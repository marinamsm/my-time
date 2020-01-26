
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

// Duplicate the ID field.
activitySchema.virtual('id').get(function(){
    return this._id; // .toHexString();
});

// Ensure virtual fields are serialised.
activitySchema.set('toJSON', {
    virtuals: true
});

var Activity = module.exports = mongoose.model('Activity', activitySchema);

module.exports.get = function (callback, limit) {
    Activity.find(callback).limit(limit);
};