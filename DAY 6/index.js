
const express = require('express');

const app = express(); // eslint-disable-line
const port = 3000; // default port


app.get('/', (req, res) => //function
   res.json({message: 'Hello world'}));
  // res.send('Hello, World!'));

app.listen(3000);