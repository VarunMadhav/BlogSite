const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
/*In summary, this code defines a route for user registration, extracts user data from the request, saves the user to the database,
 and sends a response indicating success or failure, depending on whether an error occurs during the process. There is a minor issue 
 with the response for success that should be corrected to send the user data instead of the error object.*/
router.post("/register", async (req,res)=>{
    try{ 
        // Generate a salt and hash the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);   
        const newUser = new User({//req.body pe sab kuch aajayega request usme hamei bas ye 3 chahiye jo User module mei the
            username: req.body.username,
            email: req.body.email,
            //password: req.body.password,
            password: hashedPass,
        });

        /*The newUser object, which represents the user data, is saved to the database using the save method. This method returns a 
        promise that resolves to the saved user object.*/
        const user = await newUser.save();
        // Send a 200 OK response with the user data
        res.status(200).json(user);

    } catch(err){
        // Send a 500 Internal Server Error response with the error details
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req,res)=>{
    try{    
        // mongodb mei jo store karehai usme se find karo user jispe ye akela unique username 
        const user = await User.findOne({username: req.body.username});
        // agar user nahi mila toh fir
        !user && res.status(400).json("400:Wrong Credentials!");

        // now is postman pe jo password store kara hai woh match karta hai atlas mei store kara hashedPass se ie match karke toh login kar sakte hai
        //                                   //provided password  //because we have hashed our userinto mongodb atlas.. ie atlas pe jo stored hai password      
        const validate = await bcrypt.compare(req.body.password, user.password);
        !validate && res.status(400).json("400:Wrong Credentials!");
        
        // we dont want to send the password to the user. so passord chodke others jo bhi hai woh send karenge islie seedha res.status(200).json(user); nahi karenge
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    } catch(err){
        res.status(500).json(err);
    }
});



/*
In the provided code portion:

javascript
Copy code
const salt = await bcrypt.genSalt(10);
const hashedPass = await bcrypt.hash(req.body.password, salt);   
const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
});
The extraction of data from the request occurs within the new User({...}) part. Here's how it works:

req.body represents the request body, which is typically provided by the client when making an HTTP request. It contains data sent by the client in the request.

Within the new User({...}) object, the code extracts specific pieces of data from req.body and assigns them to the corresponding fields of the newUser object:

req.body.username is extracted and assigned to the username field of newUser.
req.body.email is extracted and assigned to the email field of newUser.
hashedPass, which is the result of hashing the password, is assigned to the password field of newUser.
This way, the code populates the newUser object with the extracted data from the client's request, and it's ready to be saved to the database.

So, the extraction of data from the request body occurs specifically when the newUser object is created and initialized with the user's username, email, and hashed password.
*/