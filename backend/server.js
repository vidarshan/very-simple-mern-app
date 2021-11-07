require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error)
})

db.once('open', () => {
    console.log('Connected to database')
})

app.use(express.json())

app.use(cors());
const posts = require('./routes/posts');
app.use('/posts', posts)

app.listen(5000, () => console.log('Server Started'))