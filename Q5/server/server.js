require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./authMiddleware');
const PORT = process.env.PORT || 3000;
const taskRoutes = require('./routesTasks');

app.use(express.json());
app.use(cors());


const users =[
  {name:'Shalom',id:1,password:123456},
  {name:'Moshe',id:2,password:12345678},
  {name:'Ysrael',id:3,password:123456789}
];
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { error: 'to meny req - try later..' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/tasks', authMiddleware, taskRoutes);
app.post('/api/login', limiter, (req, res) => {
  const { name, password } = req.body;

  const user = users.find(u => u.name === name && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid name or password' });
  }

  const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  res.json({ token });
});
async function connectMongo() {
    try {
      await mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("✅ Connected to MongoDB");
    } catch (err) {
      console.error("❌ Failed to connect MongoDB:", err.message);
    }
  }
  connectMongo();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  