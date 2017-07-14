const express = require('express');
const router = express.Router();
const Post = require('../models/posts-model');
const mongoose = require('mongoose');

router.get('/posts', (req, res, next) => {
  Post.find((err, postsList) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(postsList);
  });
});


router.post("/posts", (req, res, next) => {

  const thePost = new Post ({
    content: req.body.content,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  });

  thePost.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "new post created!",
      id: thePost._id
    });
  });

});

router.get("/posts/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: "specified id is not valid"});
      return;
  }

  Post.findById(req.params.id, (err, thePost) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(thePost);
  });
});

router.put('/posts/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: 'Specified id is not valid'});
    return;
  }

  const updates = {
    content: req.body.content,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };

  Post.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Post updated sucessfully"
    });
  });
});

router.delete('/posts/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: "Specified id is not valid"});
    return;
  }

  res.json({
    message: "Post has been removed"
  });
});


module.exports = router;
