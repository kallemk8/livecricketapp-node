const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const auth = require('./routes/auth');
mongoose.connect('mongodb://localhost/livecricket',  { useUnifiedTopology: true , useNewUrlParser: true})
    .then(()=>console.log('Connected to mongoDB'))
    .catch(ex=>console.log('Not connected mongodb'))
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


app.use('/api/user', user);
app.use('/api/auth', auth);
app.get('/', function (req, res) {
    res.send('Hello World');
 });

app.listen(9000, ()=> console.log("9000 port are currently using"))
