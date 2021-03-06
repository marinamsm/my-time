
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TimeLog fields
let timeLogSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity'
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    intervalDuration: {
        type: Number,
        required: true
    },
    extraCost: {
        type: Number
    },
    obs: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Duplicate the ID field.
timeLogSchema.virtual('id').get(function(){
    return this._id; // .toHexString();
});

// Ensure virtual fields are serialised.
timeLogSchema.set('toJSON', {
    virtuals: true
});

var TimeLog = module.exports = mongoose.model('TimeLog', timeLogSchema);

module.exports.get = function (callback, limit) {
    TimeLog.find(callback).limit(limit);
};