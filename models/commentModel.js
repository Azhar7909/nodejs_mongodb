const Mongoose = require("mongoose");

const commentSchema = new Mongoose.Schema(
    {
        name:{type:String, required:"name comment is required"},
        email:{type:String, required:"email comment is required"},
        // Relation (Associate) Post data model with Comment data model  in MongoDB
        post: { type: Mongoose.Schema.Types.ObjectId, ref: "Post", required:"post is required field"}
        
    },
    {
        timestamps:true              // property added in your save data like createdAt & updatedAt
    }
);

module.exports = Mongoose.model("Comment", commentSchema);