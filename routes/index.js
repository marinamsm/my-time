const express = require("express");
const router = express.Router();
const timeLogController = require("../controller/timeLogController");
const projectController = require("../controller/projectController");
const activityController = require("../controller/activityController");

// Route to list all logs in a period of time
router.route("/home").get(timeLogController.listTimeLogs);

// Route to create a new log
router.route("/timelog").post(timeLogController.createTimeLog);
router.route("/project").post(projectController.createProject);
router.route("/activity").post(activityController.createActivity);

//Route to get time logs in a date interval
router.route("/timelog").get(timeLogController.getTimeLog);
router.route("/project").get(projectController.listProjects);
router.route("/activity").get(activityController.listActivities);

// Routes to get the specified log, update and delete it
router
  .route("/timelog/:id")
  .get(timeLogController.getTimeLog)
  .put(timeLogController.updateTimeLog)
  .delete(timeLogController.deleteTimeLog);
router
  .route("/project/:id")
  .get(projectController.getProject)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);
router
  .route("/activity/:id")
  .get(activityController.getActivity)
  .put(activityController.updateActivity)
  .delete(activityController.deleteActivity);

module.exports = router;
