const express = require('express');
const router = express.Router();
const timeLogController = require('../controller/timeLogController');

// Route to list all logs in a period of time
router.route('/home').get(timeLogController.listTimeLogs);

// Route to create a new log
router.route('/createTimeLog').post(timeLogController.createTimeLog);


// Routes to get the specified log, update and delete it
router.route('/timelogs/:timelog_id')
    .get(timeLogController.getTimeLog)
    .put(timeLogController.updateTimeLog)
    .delete(timeLogController.deleteTimeLog);

module.exports = router;
