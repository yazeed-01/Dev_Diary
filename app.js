const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('public'))
const ejs = require('ejs')
app.set('view engine','ejs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const BlogPost = require('./db/models/BlogPost')
const config = require('./db/config');
const connect =  require('./db/connect')
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const fs = require("fs")
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const controllers404 = require('./controllers/404')
const about = require('./controllers/about')
const contact = require('./controllers/contact')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const flash = require('connect-flash');
const { title } = require('process');


app.use(flash());
app.use(expressSession({
    secret: 'keyboard cat'
    }))


global.loggedIn = null;
app.use("*", (req, res, next) => {
loggedIn = req.session.userId;
next()
});



app.get('/',homeController)

app.get('/post/:id',getPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.get('/posts/new',authMiddleware, newPostController)

app.get('/about',about)

app.get('/contact',contact)

app.get('/register', redirectIfAuthenticatedMiddleware, newUserController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/logout', logoutController)


app.delete('/posts/:id/delete', authMiddleware, async (req, res) => {
    try {
      const postId = req.params.id;
      await BlogPost.findByIdAndDelete(postId);
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete post' });
    }
  });


  app.get('/post/:id/edit', authMiddleware, async (req, res) => {
    try {
      const postId = req.params.id;
      // Fetch blog post data from MongoDB using Mongoose
      const blogPost = await BlogPost.findById(postId);
  
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }
  
      res.render('editPost', { blogPost });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching blog post');
    }
  });

  
  app.get('/post/:id/edit', authMiddleware, async (req, res) => {
    try {
      const postId = req.params.id;
      const blogPost = await BlogPost.findById(postId);
      res.render('editPost', { blogPost });
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., render an error page
      res.status(500).send('Failed to fetch post for editing');
    }
  });
// Add this route to app.js
app.post('/update/:id', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, body, code, image } = req.body;

    // Update the post in the database
    const updatedPost = await BlogPost.findByIdAndUpdate(postId, {
      title,
      body,
      code,
      image
    }, { new: true }); 

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }

    res.redirect(`/post/${postId}`); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update post');
  }
});
 
  




app.use(controllers404)
app.listen(4000, ()=>{
    console.log('App listening on port 4000')
    })
    