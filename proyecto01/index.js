const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const ip = "192.168.2.106";


app.use('/static', express.static('public'))
app.use('/static', express.static('style'))

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, './view/')
  });
})

app.listen(port, () => {
  console.log('http://' + ip + ':' + port + '/');
})
