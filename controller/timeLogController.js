// Import TimeLog model
var TimeLog = require('../model/TimeLog');

let requiredFields = ['project', 'activity', 'startTime', 'endTime']

let dateFields = ['startTime', 'endTime']

function checkRequiredFields(body) {
    let missingFields = []
    for (let field of requiredFields) {
        if (field in body)
            continue;
        missingFields.push(field);
    }
    return missingFields;
}

// GET
// service to list all timeLogs
exports.listTimeLogs = function(req, res) {
    TimeLog.find({}, function(err, timeLogs) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            timeLogs: timeLogs.map(el => el.toJSON())
        });
    });
};

// POST
// service to create a new timeLog
exports.createTimeLog = function(req, res) {
    let missingFields = checkRequiredFields(req.body);
    if (missingFields.length > 0) {
        res.json({
            code: 400,
            message: "The request is missing the fields: " + missingFields
        });
    }
    let timeLogTmp = req.body;
    timeLogTmp.startTime = new Date(timeLogTmp.startTime);
    timeLogTmp.endTime = new Date(timeLogTmp.endTime);
    timeLogTmp.extraCost = timeLogTmp.extraCost || 0;
    timeLogTmp.intervalDuration = timeLogTmp.intervalDuration || 0;
    timeLogTmp.obs = timeLogTmp.obs || '';
    let timeLog = new TimeLog(timeLogTmp);
    // console.log(timeLog)
    // save the timeLog
    timeLog.save(function(err) {
        if (err)
            res.json({
                code: err.code,
                message: err.message
            });
        else
            res.json({
                message: 'Success!',
                code: 200,
                data: timeLog.toJSON()
            });
    });
};

// GET
// service to get timeLog's details (name)
exports.getTimeLog = function(req, res) {
    TimeLog.find({}, function(err, timeLogs) {
        let result = [];
        if (Object.keys(req.body).length === 0) {
            result = timeLogs;
            res.json({
                message: 'Success!',
                code: 200,
                data: result
            });
            return;
        }
        for (let timeLog of timeLogs) {
            if (new Date(timeLog.startTime).getTime() >= new Date(req.body.startTime).getTime() &&
                new Date(timeLog.endTime).getTime() <= new Date(req.body.endTime).getTime()) {
                result.push(timeLog);
            }
        }
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            data: result.map(el => el.toJSON())
        });
    });
};

// PUT
// service to change the name of the timeLog
// status is added separately, to keep db normalized
exports.updateTimeLog = function(req, res) {
    TimeLog.findById(req.params.id, function(err, timeLog) {
        if (err || !timeLog)
            res.send({ 404: "TimeLog not found" });
        else {
            for (let key in req.body) {
                timeLog[key] = dateFields.indexOf(key) !== -1 ? new Date(req.body[key]) : req.body[key];
            }
            timeLog.save(function(err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Success!',
                    code: 200,
                    data: timeLog.toJSON()
                });
            });
        }
    });
};

// DELETE
// service to delete a timeLog
exports.deleteTimeLog = function(req, res) {
    // console.log(req.params);
    TimeLog.remove({
        _id: req.params.id
    }, function(err) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200
        });
    });
};