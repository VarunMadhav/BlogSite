const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//CREATE POST
/* In summary, this route allows clients to create new posts by sending a POST request with 
the post data in the request body. The new post is saved to the database, and the server responds 
with the saved post data or an error message, depending on the success or failure of the creation process. */
router.post("/", async (req, res) => {
  // new post object banaya jisme postman application mei username title description etc jo bhi hai Post module mei woh sab aajayega.
  // then iss new post ko fir save karenge database mei 
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    // pehle toh params mei jo id daalenge usko dundo Post mei fir uss object ko post mei daaldo
    const post = await Post.findById(req.params.id);
    
    // Check if the owner of the post matches the user making the request
    // ie mongodb atlas mei jo username hai woh agar match kar raha hai postman mei req.body wale username se then matlab correct owner
    if (post.username === req.body.username) {
      try {
        /*
        It attempts to update the post by its ID using Post.findByIdAndUpdate
        $set operator is used to update the fields in the database document with the values from req.body. The { new: true } option ensures 
        that the updated post document is returned as the response, including any changes made during the update.
        */
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    // /?xyz="val"...isme? ke baad wala xyz hai query ie user ya category and val hai username ya category name
    //localhost:3000/api/posts?user=varupdated
    const username = req.query.user;//username mei aajayega varupdated.
    const catName = req.query.cat;

    try{
        let posts;
        //agar user query parameter specified tha... toh fir uss specified username ko find karo and posts mei daaldo
        // same for catName
        if(username){
            posts = await Post.find({username});
        }
        else if(catName){
            // Post mei categoories ka ek array hai so categories array ke inside mei agar catName milta hai toh usko find karo array mei se and daaldo posts mei.
            posts = await Post.find({
                categories:{
                    $in: [catName],
                },
            });
        }
        else{
            //fetch all posts
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;