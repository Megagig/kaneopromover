
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;          
  const limit = parseInt(req.query.limit) || 10;
  
  res.json({ page, limit, data: [] });
});


router.get('/:id', (req, res) => {
  const userId = req.params.id;                       
  res.json({ id: userId, name: 'Keano movers' });
});

module.exports = router;
// routes/router.js
const express = require('express');
const userRoutes = require('./users');