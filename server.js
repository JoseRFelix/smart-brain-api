const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'darkon13654321',
      database : 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => { res.send('it is working') });
app.post('/signin', signIn.handleSignIn(db, bcrypt));
app.post('/register',  register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.put('/image', image.handleImage(db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running in port ${process.env.PORT}`);
})