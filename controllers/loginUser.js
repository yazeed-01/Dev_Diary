bcrypt = require('bcrypt');
const User = require('../db/models/user.js');


module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username: username });
      if (user) {
        const same = await bcrypt.compare(password, user.password);
        if (same) {
          req.session.userId = user._id
          res.redirect('/');
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  };