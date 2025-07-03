const express = require('express');
const router = express.Router();
const taskControler = require('./taskControler');

router.get('/', taskControler.getAllTasks);
router.post('/', taskControler.createTask);
router.put('/:id', taskControler.updateTask);
router.delete('/:id', taskControler.deleteTask);


module.exports = router;
