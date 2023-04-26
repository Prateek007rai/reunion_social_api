const jwt = require('jsonwebtoken');
const User = require('../models/userSchema'); 
const {JWT_SECRET} = require('../keys');

// home page message
module.exports.home = (req,res)=>{
    res.send("<h2>Welcome By Prateek Rai</h2> I hope You like my social Api and I get reply on email that I have to add register endpoint..... <p>Thank you</p>  ");
}

// user registration
module.exports.register = async(req,res)=>{
    console.log(req.body);
    const { name, email, password } = req.body;
    let existingUser;
    try{
       existingUser = await User.findOne({ email });
    } catch (err) {
    console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User Already Exist"});
    }
    const user = new User({
        name,
        email,
        password
    });

    try{
        await user.save();
    }catch(err){
         console.log(err);
    }
    return res.status(201).json({message:"User Created"});
}

// basically it is login
module.exports.authenticate = async(req,res)=>{
    console.log(req.body);
    const { email, password } = req.body;
    if(!email || !password ){
        return res.status(404).json({error: "Please enter the details First"});
    }
    let existingUser;
    try {
       existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
       return res
        .status (404)
        .json({ message: "User is not registered, go to api/register and enter name, email, password" });
    }

    if(password !== existingUser.password){
        return res.status(404).json({message:"Invalid Email or Password"});
    }
    const token = jwt.sign({_id: existingUser._id}, JWT_SECRET);
    console.log("my token is here ---", token);
    res.status(200).json({Token:token});

}


//search by user
module.exports.getAllUser = async(req, res) => {
    let users;
    try {
       users = await User.find();
    } catch (err) {
      return console.log(err);
    }
    if (!users) {
       return res.status(404).json({ message: "No users Found" });
    }
    return res.status(200).json({ users });
}


//follower and following
module.exports.followUser = async(req, res) => {
    const secondUserId = req.params.id;                                         //2nd person , 
    const userId =  req.body._id;                                                  // Me
    if(userId === secondUserId){
        return res.status(403).json({message: "You can not follow yourself !!! follow others"})
    }
    try {
       const user = await User.findById(userId);
       const secondUser = await User.findById(secondUserId);
       if(!user.followers.includes(secondUserId)){
          await user.followers.push(secondUserId);
          await secondUser.followings.push(userId);
          user.save();
          secondUser.save();
          return res.status(200).json({message: "followed successfully !!", user, secondUser});
       }else{
        return res.status(404).json({message: "You already followed"});
       }
    } catch (err) {
      return console.log(err);
    }
}



//unfollow and unfollowing
module.exports.unfollowUser = async(req, res) => {
    const secondUserId = req.params.id;                                         //2nd person , 
    const userId =  req.body._id;                                                  // Me
    if(userId === secondUserId){
        return res.status(403).json({message: "You can not unfollow yourself !!! unfollow others"})
    }
    try {
       const user = await User.findById(userId);
       const secondUser = await User.findById(secondUserId);
       if(user.followers.includes(secondUserId)){
          await user.followers.pull(secondUserId);
          await secondUser.followings.pull(userId);
          user.save();
          secondUser.save();
          return res.status(200).json({message: "Unfollowed successfully !!", user, secondUser});
       }else{
        return res.status(404).json({message: "You already Unfollowed"});
       }
    } catch (err) {
      return console.log(err);
    }
}


