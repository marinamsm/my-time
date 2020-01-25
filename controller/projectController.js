// Import Project model
var Project = require('../model/Project');

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
// service to list all projects
exports.listProjects = function(req, res) {
    Project.find({deleted: false}, function(err, projects) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            data: projects.map(el => el.toJSON())
        });
    });
};

// POST
// service to create a new project
exports.createProject = function(req, res) {
    let missingFields = checkRequiredFields(req.body);
    if (missingFields.length > 0) {
        res.json({
            code: 400,
            message: "The request is missing the fields: " + missingFields
        });
    }
    req.body.deleted = false;
    let project = new Project(req.body);
    project.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'Success!',
                code: 200,
                data: project.toJSON()
            });
    });
};

// GET
// service to get project's details (name and description)
exports.getProject = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err)
            res.send(err);
        res.json({
            message: 'Success!',
            code: 200,
            data: project.toJSON()
        });
    });
};

// PUT
// service to change the name of the project
// status is added separately, to keep db normalized
exports.updateProject = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err || !project)
            res.send({ 404: "Project not found" });
        else {
            for (let key in req.body) {
                project[key] = req.body[key];
            }
            project.save(function(err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Success!',
                    code: 200,
                    data: project.toJSON()
                });
            });
        }
    });
};

// DELETE
// service to delete a project
exports.deleteProject = function(req, res) {
    Project.findById(req.params.id, function(err, project) {
        if (err || !project)
            res.send({ 404: "Project not found" });
        else {
            project.deleted = true;
            project.save(function(err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'Success!',
                    code: 200,
                    data: project.toJSON()
                });
            });
        }
    });
};