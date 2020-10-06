const dotenv = require('dotenv').config();

const express = require('express');

//middleware

const morgan = require('morgan');

const mongoose = require('mongoose');

//import the quote route file

const categoryRoutes = require('./routes/categoryRoutes');

const quoteRoutes = require('./routes/quoteRoutes');

// express app
const app = express();

//connect database

const dbURI = process.env.DB_URL;

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err));

//injecting dynamic ejs

app.set('view engine', 'ejs');

 
//middleware & static files

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

app.use(morgan('dev'));


//routes
app.get('/', (req, res) =>{
   res.redirect('/quotes');  
});
app.get('/about', (req, res) =>{
    
    res.render('about', {title: 'About'})
});

app.use('/category',  categoryRoutes);


// quote routes 

app.use('/quotes', quoteRoutes);

// 404 page

app.use((req, res) => {
    res.status(404).render('404', {title: '404 error'});
});
