const express = require('express');
const Analysis = require('../models/Analysis');
const auth = require('../middleware/auth');
const router = express.Router();

// Add analysis to an idea
router.post('/:ideaId', auth, async (req, res) => {
  const { analysis, type } = req.body;
  try {
    const record = await Analysis.create({
      ideaId: req.params.ideaId,
      userId: req.user.id,
      analysis,
      type
    });
    res.status(201).json(record);
  } catch {
    res.status(500).json({ error: 'Failed to save analysis' });
  }
});

// List analyses for an idea
router.get('/:ideaId', async (req, res) => {
  const list = await Analysis.findAll({
    where: { ideaId: req.params.ideaId },
    include: 'analyst'
  });
  res.json(list);
});

module.exports = router;
