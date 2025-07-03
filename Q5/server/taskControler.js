const Task = require('./Task');


exports.createTask = async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    }
     catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateTask = async (req, res) => {
    try {
      const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ error: 'Task not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.deleteTask = async (req, res) => {
    try {
      const deleted = await Task.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Task not found' });
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  