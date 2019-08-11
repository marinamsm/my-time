
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TimeLog fields
let timeLogSchema = new Schema({
    // project: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Project'
    // },
    project: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
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

var TimeLog = module.exports = mongoose.model('TimeLog', timeLogSchema);

module.exports.get = function (callback, limit) {
    TimeLog.find(callback).limit(limit);
};