require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { shorten, goTo } = require('./services/url')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// create this array to store the urls in memory
const urls = [];

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;
  const data = shorten(url,urls);
  res.json(data);
})

app.get('/api/shorturl/:id', (req, res) => {
  const { id } = req.params;
  const url = goTo(id,urls);
  res.redirect(url)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
