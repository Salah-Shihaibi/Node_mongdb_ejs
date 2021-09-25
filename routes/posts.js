const express = require("express");
const router = express.Router();
const Post = require("../model/post");
//const fetch =  require("node-fetch");

// fetch data if needed
// const text = async () => {
//   const res = await fetch(
//       "http://localhost:8000/posts"
//     );
//   const data = await res.text();
//   //console.log(data)
//   return data;
// };
// text()

// route
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("posts", {
      posts: posts.reverse(),
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    if (post.title.length < 3 || post.description.length < 3){
      const posts = await Post.find();
      res.render("posts", {
        posts: posts.reverse(),
        err: 'Title and description must be added'
      });
    }
    else {
      const savedPost = await post.save();
      await hideAllAdjustments();
      res.redirect('/posts');
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.json(post);
//   } catch (err) {
//     res.json({ msg: err });
//   }
// });

router.get("/delete/:id", async (req, res) => {
  try {
    const removePost = await Post.remove({ _id: req.params.id });
    await hideAllAdjustments();
    res.redirect('/posts');
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get("/adjust/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          edit: !post.edit,
        },
      }
    );
    res.redirect('/posts#'+ req.params.id);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post("/patch/:id", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      }
    );
    await hideAllAdjustments();
    res.redirect('/posts#'+ req.params.id);
  } catch (err) {
    res.json({ msg: err });
  }
});

hideAllAdjustments = async () => {
  const updatePost = await Post.updateMany(
    {},
    {
      $set: {
        edit: true,
      },
    }
  );
};

module.exports = router;
