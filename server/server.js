const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path')
const mongoose = require('mongoose')

const PORT = 3000;
const app = express();

const userRouter = require('./routes/users');

mongoose.connect('mongodb://localhost/animeQuoteGame');

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'client', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'client', 'signup.html'))
})

app.use('/users', userRouter);

app.get('/game', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'index.html'))
})

app.use('/build', express.static(path.join(__dirname, '..', 'build')));



app.use((req, res) => {
    res.status(404).send('404 file not found.')
})

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(500).send('Internal server error, check server logs for details.');
});


app.listen(PORT, ()=>
    console.log('Listening on port 3000.')
)