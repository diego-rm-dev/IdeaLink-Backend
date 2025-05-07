const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const router = express.Router();

// Forward request to Python AI microservice for idea generation
router.post('/generate', auth, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PYTHON_SERVICE_URL}/generate`,
      { prompt: req.body.prompt }
    );
    res.json(response.data);
  } catch (err) {
    res.status(502).json({ error: 'AI service unavailable' });
  }
});

// Forward request for detailed analysis by Python service
router.post('/analyze', auth, async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PYTHON_SERVICE_URL}/analyze`,
      { ideaId: req.body.ideaId, question: req.body.question }
    );
    res.json(response.data);
  } catch {
    res.status(502).json({ error: 'AI service unavailable' });
  }
});

module.exports = router;
