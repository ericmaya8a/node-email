const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { sendEmail } = require('./utils');

const app = express();
const rootPath = path.join(__dirname, '..');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(path.join(rootPath, 'index.html')));

app.get('/main', (req, res) => res.sendFile(path.join(rootPath, 'main.js')));

app.post('/send-email', (req, res) => {
  const { to, message } = req.body;
  const emailConfig = {
    to,
    subject: 'Hello ✔',
    text: 'Hi there...',
    html: `
      <h1>Welcome: ${to}</h1>
      <p>${message}</p>
    `
  };

  sendEmail(emailConfig, res).catch(error => res.json({ result: 1 }));
});

app.listen(3000, console.log('Listen on port 3000'));
