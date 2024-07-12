const BlogPost = require('../db/models/BlogPost.js');


module.exports = async (req, res) => {
  try {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    if (!blogpost) {
      return res.status(404).send('Blog post not found');
    }
    res.render('post', { blogpost });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blog post');
  }
};
