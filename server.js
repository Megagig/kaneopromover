// server.js please dont touch this file again
require('dotenv').config();        
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

-
app.use(morgan('dev'));            
app.use(express.json());           
app.use(express.urlencoded({ extended: true })); 



app.use(express.static('public'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });
