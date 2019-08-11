// Import TimeLog model
var TimeLog = require('../model/TimeLog');

let requiredFields = ['project', 'activity', 'date', 'startTime', 'endTime', 'intervalDuration']

let timeout = 120000; //milliseconds

// service to define the interval between each events batch
exports.setEventsInterval = function(req, res) {
    try {
        timeout = parseInt(req.body.interval);
        res.json({
            message: 'Success!',
            code: 200
        });
    }catch(err) {
        res.json({
            code: err.code,
            message: err.message
        });
    }
};

function checkRequiredFields(body){
    let missingFields = []
    for(let field of requiredFields){
        if(field in body)
            continue;
        missingFields.push(field);
    }
    return missingFields;
}
// function to save array of documents on db
function saveAll(docArray){
    let doc = docArray.pop();
    let total = docArray.length;
    doc.save(function(err, saved){
        if (err) throw err;//handle error
        if (total) saveAll(docArray);
    })
}

// GET
// service to list all timeLogs
exports.listTimeLogs = function (req, res) {
    TimeLog.find({}, function (err, timeLogs) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            timeLogs: timeLogs
        });
    });
};

// POST
// service to create a new timeLog
exports.createTimeLog = function (req, res) {
    let missingFields = checkRequiredFields(req.body);
    if (missingFields.length > 0){
        res.json({
            code: 400,
            message: "The request is missing the fields: " + missingFields
        });
    }
    // timeLog.project = req.body.project;
    // timeLog.activity = req.body.activity;
    // timeLog.date = req.body.date;
    // timeLog.startTime = req.body.startTime;
    // timeLog.endTime = req.body.endTime;
    // timeLog.intervalDuration = req.body.intervalDuration; //time in minutes
    let timeLogTmp = req.body;
    timeLogTmp.extraCost = timeLogTmp.extraCost || 0;
    timeLogTmp.obs = timeLogTmp.obs || '';
    let timeLog = new TimeLog(timeLogTmp);
    // console.log(timeLog)
    // save the timeLog
    timeLog.save(function (err) {
        if (err)
           res.json({
               code: err.code,
               message: err.message
           });
        else
            res.json({
                message: 'Success!',
                code: 200,
                data: timeLog
            });
    });
};

// GET
// service to get timeLog's details (name)
exports.getTimeLog = function (req, res) {
    TimeLog.findById(req.params.timeLog_id, function (err, timeLog) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            data: timeLog
        });
    });
};

// PUT
// service to change the name of the timeLog
// status is added separately, to keep db normalized
exports.updateTimeLog = function (req, res) {
    TimeLog.findById(req.params.timeLog_id, function (err, timeLog) {
        if (err || !timeLog)
            res.send("TimeLog not found");
        for(let key in req.body) {
            timeLog[key] = req.body[key]
        }
        // save the timeLog
        timeLog.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Success!',
                code: 200,
                data: timeLog
            });
        });
    });
};

// DELETE
// service to delete a timeLog
exports.deleteTimeLog = function (req, res) {
    TimeLog.remove({
        _id: req.params.timeLog_id
    }, function (err) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200
        });
    });
};
