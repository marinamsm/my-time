// Import Activity model
var Activity = require('../model/Activity');

let requiredFields = ['name'];

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
// service to list all activities
exports.listActivities = function(req, res) {
    const filter = {
        deleted: false
    };
    if (req.query.ids) {
        filter._id = {
            $in: req.query.ids
        };
    }
    Activity.find(filter, function(err, activities) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            data: activities.map(el => el.toJSON())
        });
    });
};

// POST
// service to create a new activity
exports.createActivity = function(req, res) {
    let missingFields = checkRequiredFields(req.body);
    if (missingFields.length > 0) {
        res.json({
            code: 400,
            message: "The request is missing the fields: " + missingFields
        });
    }
    req.body.deleted = false;
    let activity = new Activity(req.body);
    activity.save(function(err) {
        if (err)
            res.json({
                code: err.code,
                message: err.message
            });
        else
            res.json({
                message: 'Success!',
                code: 200,
                data: activity.toJSON()
            });
    });
};

// GET
// service to get activity's details (name and description)
exports.getActivity = function(req, res) {
    Activity.findById(req.params.id, function(err, activity) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            data: activity.toJSON()
        });
    });
};

// PUT
// service to change the name of the activity
// status is added separately, to keep db normalized
exports.updateActivity = function(req, res) {
    Activity.findById(req.params.id, function(err, activity) {
        if (err || !activity)
            res.send({ 404: "Activity not found" });
        else {
            for (let key in req.body) {
                activity[key] = req.body[key];
            }
            activity.save(function(err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Success!',
                    code: 200,
                    data: activity.toJSON()
                });
            });
        }
    });
};

// DELETE
// service to delete a activity
exports.deleteActivity = function(req, res) {
    Activity.findById(req.params.id, function(err, activity) {
        if (err || !activity)
            res.send({ 404: "Activity not found" });
        else {
            activity.deleted = true;
            activity.save(function(err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Success!',
                    code: 200,
                    data: activity.toJSON()
                });
            });
        }
    });
};