const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

//UPDATE
/*In summary, this code defines a route for updating user information, including the option to change the user's password, and it ensures that users can only update their 
own accounts. It handles password hashing for security and responds with appropriate status codes and messages based on the success or failure of the update operation.*/

router.put("/:id", async (req, res) => {
  /*It checks if the userId included in the request body matches the id parameter provided in the URL. This check ensures that users can only update their own accounts.*/  
  if (req.body.userId === req.params.id) {
    // If the request includes a new password (req.body.password), it hashes the password using bcrypt. This step is important for securely updating the user's password 
    // in the database.
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      // pehle toh User mei ie database mei jaake URL mei ie req.params.id jo user's Id hai use through find karega ki kaun specific user ko update karna hai
      // and The $set operator is used to update the fields in the database document with the values from req.body. ie postman application mei hamne jo req.body banai hai 
      // ie naya username and password woh ab purane wale pe update kardenge
      // { new: true } ensures that the updated user document is returned as the response, including any changes made during the update.
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },{new:true});
      
      // if successful... 200 ie OK status 
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } 
  // If the check from step 3 fails (i.e., the requested user ID does not match the user making the request), the route responds with a 401 Unauthorized status, 
  // indicating that the user is not allowed to update accounts other than their own.
  else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
/*
It checks if the user making the request matches the user to be deleted, ensuring that users can only delete their own accounts.
If the user is found, it attempts to delete all posts associated with that user and then deletes the user account from the database.
If the deletion process is successful, it responds with a 200 OK status and a message indicating that the user has been deleted.
If the user is not found, it responds with a 404 Not Found status and a message indicating that the user was not found.
If the user making the request does not match the user to be deleted, it responds with a 401 Unauthorized status, indicating that the user can only delete their own account.
*/
router.delete("/:id", async (req,res)=>{
  // jo url mei id hai ie params.id agar req jiska kara hai uss 
  if(req.body.userId === req.params.id){
    try{
      //The code attempts to find the user with the provided ID using User.findById
      const user = await User.findById(req.params.id);
      try{
        // then jo bhi user ke post jo hamne banaye hai modules woh jitne bhi posts ho sabko delete
        await Post.deleteMany({username:user.userId});
        // Then, it deletes the user's account from the database using 
        await User.findByIdAndDelete(req.params.id);
        
        res.status(200).json("User has been Deleted!");
      
      } catch(err){
        // deletion process mei error
        res.status(500).json(err);
      }

    } catch(err){
      res.status(404).json("User not found");
    }
  }
  else{
    res.status(401).json("You can only delete your account!");
  }
});

// GET USER
router.get("/:id", async (req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(200).json(others);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;