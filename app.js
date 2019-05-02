// REQUIRE LIBRARIES
var express = require('express')
// var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// var methodOverride = require('method-override')
// var expressSanitizer = require('express-sanitizer')

// APP CONFIG
var app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))


// MONGOOSE MODEL CONFIG

// ROUNTE --------------------------------------------------------

// HOME ROUTE
app.get('/', function (req, res) {
  res.redirect('/blogs')
})

// INDEX ROUTE
app.get('/blogs', function (req, res) {
  res.render('blog/index')
  
})

// SHOW ROUTE
app.get('/blogs/:id', function (req, res) {

})

// NEW ROUTE
app.get('/blogs/new', function (req, res) {

})

// CREATE ROUTE
app.post('/blogs', function (req, res) {

})

// EDIT ROUTE
app.get('/blogs/:id/edit', function (req, res) {

})

// UPDATE ROUTE
app.put('blogs/:id', function (req, res) {

})

// DELETE ROUTE
app.delete('blogs/:id', function (req, res) {
  
})



// RUN SERVER ------------------------------------------------------
app.listen('3000', function () {
  console.log('RESTful-Blog2')
})