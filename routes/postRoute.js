const mongoose = require("mongoose");
const express = require("express")
const router = express.Router();


const Post = mongoose.model("Post")
const Comment = mongoose.model("Comment")


// Read data
router.get("/", async (req, res) => {    
   try {
       const posts = await Post.find({})
       res.send(posts)
   } catch (error) {
       res.status(500)
   }
}
)

// Create data
router.post("/", async(req, res) => {
    const newPost = new Post();
    newPost.name = req.body.name;
    newPost.email = req.body.email;

    await newPost.save(); // one async hn jo promise return krta hn
    res.send(newPost);
}
)

//  hit particular Id aginst data in database collection
router.get("/:postId", async (req, res) => {
    const post = await Post.find({_id:req.params.postId})
    res.send(post)
}
)

//  update data
router.put("/:postId", async (req, res) => {
    const post = await Post.findByIdAndUpdate({_id:req.params.postId}, req.body, {new: true, runValidators:true});
    res.send(post)
}
)

// Delete 
router.delete("/:postId", async (req, res) => {
    const post = await Post.findByIdAndRemove({_id:req.params.postId});
    res.send(post);    
}
)

// Create comment route
router.post("/:postId/comment", async (req, res) => {
    // Find post
    const post = await Post.findOne({_id:req.params.postId})

    // Create Comment
    const comment = new Comment();
    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.post = post._id
    await comment.save();

    // Associate post with comment
    post.comments.push(comment._id)
    await post.save();
    res.send(comment);
}
)

// Read Comment route
router.get("/:postId/comments", async (req, res) => {
    const post = await Post.find({_id:req.params.postId}).populate("comments");
    res.send(post);
}
)

// Edit comment route
router.put("/comments/:commentId", async (req, res) => 
    {
        const comment = await Comment.findByIdAndUpdate({_id:req.params.commentId},req.body, {new: true, runValidators:true});
        res.send(comment);
    }
)

// Delete comment route
router.delete("/comments/:commentId", async (req, res) => {
    await Comment.findOneAndRemove(req.params.commentId);
    res.send("Comment successfully deleted")
}
)


module.exports = router;