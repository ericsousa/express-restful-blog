// REQUIRE LIBRARIES
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var expressSanitizer = require('express-sanitizer')

// APP CONFIG
var app = express()
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(expressSanitizer())

// MONGOOSE config and modeling --------------------------------------

mongoose.connect('mongodb://localhost/restful-blog2', {useNewUrlParser: true})

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})
var Blog = new mongoose.model('Blog', blogSchema)

// Blog.create({
//   title: 'First blog post',
//   image: 'https://images.pexels.com/photos/1972738/pexels-photo-1972738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
// }, function (err, newBlog) {
//   if (err) {
//     console.log('ERRO ', erro)
//   } else {
//     console.log('INSERTED ', newBlog)
//   }
// })

// ROUTES --------------------------------------------------------

// HOME ROUTE
app.get('/', function (req, res) {
  res.redirect('/blogs')
})

// INDEX ROUTE
app.get('/blogs', function (req, res) {
  Blog.find({}, function (err, blogs) {
    if (err) {
      console.log(err)
    } else {
      res.render('blog/index', {blogs: blogs})
    }
  })
})

// NEW ROUTE
app.get('/blogs/new', function (req, res) {
  res.render('blog/new')
})

// CREATE ROUTE
app.post('/blogs', function (req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body)

  Blog.create(req.body.blog, function (err, newBlog) {
    if (err) redirect('/new')
    else redirect('/')
  })
})

// SHOW ROUTE
app.get('/blogs/:id', function (req, res) {

  Blog.findById(req.params.id, function (err, blog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('blog/show', {blog: blog})
    }
  })
})

// EDIT ROUTE
app.get('/blogs/:id/edit', function (req, res) {
  Blog.findById(req.params.id, function (err, blog) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.render('blog/edit', {blog: blog})
    }
  })
})

// UPDATE ROUTE
app.put('/blogs/:id', function (req, res) {

    // res.send('update blog put')
    req.body.blog.req = req.sanitize(req.body.blog.req)

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, blog) {
      if (err) {
        res.redirect('/blogs')
      } else {
        res.redirect('/blogs')
      }
    })
})

// DELETE ROUTE
app.delete('/blogs/:id', function (req, res) {
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect('/blogs')
    } else {
      res.redirect('/blogs')
    }
  }) 
})


// RUN SERVER ------------------------------------------------------
app.listen('3000', function () {
  console.log('RESTful-Blog2')
})