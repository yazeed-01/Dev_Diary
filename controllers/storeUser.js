const { error } = require('console');
const User = require('../db/models/user.js')
const path = require('path')
module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      // handle error
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      req.flash('validationErrors', validationErrors)
      req.flash('data', req.body)
      return res.redirect('/register')
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
}