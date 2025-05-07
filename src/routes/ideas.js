const express = require('express');
const Idea = require('../models/Idea');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new idea
router.post('/', auth, async (req, res) => {
  const { title, description, metadata } = req.body;
  try {
    const idea = await Idea.create({ title, description, metadata, userId: req.user.id });
    res.status(201).json(idea);
  } catch {
    res.status(500).json({ error: 'Failed to create idea' });
  }
});

// List all ideas
router.get('/', async (req, res) => {
  const ideas = await Idea.findAll({ include: 'creator' });
  res.json(ideas);
});

// Get single idea with analyses
router.get('/:id', async (req, res) => {
  const idea = await Idea.findByPk(req.params.id, { include: ['creator', 'analyses'] });
  if (!idea) return res.status(404).json({ error: 'Idea not found' });
  res.json(idea);
});

module.exports = router;

