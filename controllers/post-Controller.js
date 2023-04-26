const Post = require('../models/postSchema');


//create post
module.exports.create = async (req,res)=>{
    const { Title, Description} = req.body;
    const post = new Post({
        Title,
        Description,
    });
    try 
    {
        await post.save()
    } catch (err) {
        return console.log(err)
    }
    return res.status (200).json ({post})
}


//get single post by Id
module.exports.getById = async (req,res)=>{
    const postId = req.params.id;
    let post;
    try 
    {
        post = await Post.findById(postId);
    } catch (err) {
        return console.log(err)
    }

    if(!post){
        return res.status(404).json({error: "this post id does not exist"});
    }
    return res.status(200).json ({post})
}


//get all posts
module.exports.getAllPosts = async (req,res)=>{
    let posts;
    try {
       posts = await Post.find();
    } catch (err) {
      return console.log(err);
    }
    if (!posts) {
       return res.status(404).json({ message: "No posts Found" });
    }
    return res.status(200).json({ posts });
}


//delete post
module.exports.deletePost = async (req,res)=>{
    const postId = req.params.id;
    let post;
    try {
       post = await Post.findByIdAndRemove(postId);
    } catch (err) {
      return console.log(err);
    }
    if (!post) {
       return res.status(404).json({ message: "unable to delete" });
    }
    return res.status(200).json({ message: "deleted successfully" });
}


//post like 
module.exports.likePost = async (req,res)=>{
    try {
        const postId = req.params.id;
        console.log("++++++", req.body);
        const post = await Post.findById(postId);
        if(!post.likes.includes(req.body._id)){
            await post.likes.push(req.body._id);
            await post.save();
            return res.status (200).json ({message:"successfully liked",post});
        } else{
            return res.status(200).json({message:"already liked"});
        }
    } catch (error) {
    res.status (500).json(error)
    } 
}

//post unliked
module.exports.unlikePost = async (req,res)=>{
    try {
        const postId = req.params.id;
        console.log("++++++", req.body);
        const post = await Post.findById(postId);
        if(post.likes.includes(req.body._id)){
            await post.likes.pull(req.body._id);
            await post.save();
            return res.status (200).json ({message:"successfully unliked",post});
        } else{
            return res.status(200).json({message:"already unliked"});
        }
    } catch (error) {
    res.status (500).json(error)
    } 
}


//comment on post
module.exports.commentPost = async (req,res)=>{
    try {
        const postId = req.params.id;
        console.log("from comment section -- ", req.body);
        const post = await Post.findById(postId);
        await post.comments.push({
            userId: req.body._id,
            comment: req.body.comment
        });
        await post.save();
        return res.status (200).json ({message:"successfully commented",post});
    
    } catch (error) {
    res.status (500).json(error)
    } 
}

