require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Import models to initialize associations
require('./models/User');
require('./models/Idea');
require('./models/Analysis');

const authRoutes = require('./routes/auth');
const ideaRoutes = require('./routes/ideas');
const analysisRoutes = require('./routes/analysis');
const aiRoutes = require('./routes/ai');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/ideas', ideaRoutes);
app.use('/analysis', analysisRoutes);
app.use('/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
  });
  