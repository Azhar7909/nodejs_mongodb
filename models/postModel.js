const Mongoose = require("mongoose");

const postSchema = new Mongoose.Schema(
    {
        name:{type:String, required:"Name is required"},
        email:{type:String, required:"Email is required"},
        // Relation (Associate) Post data model with Comment data model  in MongoDB
        comments:[{
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }]
    },
    {
        timestamps:true  // property added in your save data like createdAt & updatedAt
    }
);

module.exports = Mongoose.model("Post",postSchema);
