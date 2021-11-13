const express = require('express')
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
const app = express()

app.use(bodyParser());
app.use(cors());
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/fail', (req, res) => res.status(403).json({msg: 'You are not allowed to access this'}));

app.use('/api/stock', function(req, res, next) {
  var token = req.get('X-AUTH-HEADER');
  var user = jwt.decode(token);
  if (user && user.user) {
    return next();
  }
  return res.status(403).json({msg: 'Please login to access this information'});
}, require('./stocks'));
app.use('/api/user', require('./user'));

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'));