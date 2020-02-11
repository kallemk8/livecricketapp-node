const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const auth = require('./routes/auth');
const upload = require('./routes/upload');
const config = require('config');
var cors = require('cors');
mongoose.connect('mongodb://localhost/livecricket',  { useUnifiedTopology: true , useNewUrlParser: true})
    .then(()=>console.log('Connected to mongoDB'))
    .catch(ex=>console.log('Not connected mongodb'))
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(cors());
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.get('/', function (req, res) {
    res.send('Hello World');
 });
const port = process.env.port || config.get('port');
const server = app.listen(port, ()=> console.log(port+" port are currently using"))
module.exports = server;