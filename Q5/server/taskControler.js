const Task = require('./Task');
const logger = require('./logger');

exports.createTask = async (req, res) => {
    try {
      const task = await Task.create(req.body);
      logger.info(`Task created: ${task}`);
      res.status(201).json(task);
    }
     catch (err) {
      res.status(400).json({ error: err.message });
      logger.error(`Error creating task: ${err.message}`);
    }
  };
  
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      logger.info(`Tasks fetched: ${tasks}`);
      res.json(tasks);
    } catch (err) {
      logger.error(`Error fetching tasks: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) {
        logger.error(`Task not found: ${req.params.id}`);
        return res.status(404).json({ error: 'Task not found' });
      }
      logger.info(`Task updated: ${updated}`);
      res.json(updated);
    } catch (err) {
      logger.error(`Error updating task: ${err.message}`);
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.deleteTask = async (req, res) => {
    try {
      const deleted = await Task.findByIdAndDelete(req.params.id);
      if (!deleted) {
        logger.error(`Task not found: ${req.params.id}`);
        return res.status(404).json({ error: 'Task not found' });
      }
      logger.info(`Task deleted: ${req.params.id}`);
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      logger.error(`Error deleting task: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  };
  