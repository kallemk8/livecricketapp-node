const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const player = require('./routes/players');
const CriNews = require('./routes/CriNews');
const Videos = require('./routes/videos');
const Photos = require('./routes/photos');
const Comments = require('./routes/comments');
const Teams = require('./routes/Teams');
const country = require('./routes/countries');
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
app.use('/api/players', player);
app.use('/api/news', CriNews);
app.use('/api/videos', Videos);
app.use('/api/photos', Photos);
app.use('/api/comments', Comments);
app.use('/api/teams', Teams);
app.use('/api/countries', country);
app.use('/api/auth', auth);
app.use('/api/upload', upload);
app.get('/', function (req, res) {
    res.send('Hello World');
 });
const port = process.env.port || config.get('port');
const server = app.listen(port, ()=> console.log(port+" port are currently using"))
module.exports = server;