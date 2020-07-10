const express = require("express");
const app = express();
require('express-async-errors');                //async eroors handling or general middleware 
require('./mongoConnection')                    //database connection
require("./models/postModel")                   //Post model requireing
require("./models/commentModel")                //Comment model requiring
const bodyParser = require("body-parser")       //Middleware requiring
const morgan = require("morgan")                //Middleware requiring

// Middleware (we can use jason now)
app.use(bodyParser.json()).use(morgan())

// Routes
app.use("/posts", require("./routes/postRoute"))

// Not found route 
app.use((req, res, next) => {
    req.status = 404;
    const error = new Error("Rout not found");
    next(error);
}
)

// Error handler

if (app.get("env") === "production") {
    app.use((error, req, res, next) => {
        res.status(req.status || 500).send({
            message : error.message
        }); 
    }
    );
}

app.use((error, req, res, next) => {
    res.status(req.status || 500).send({
        message : error.message,
        stack: error.stack,
    }); 
}
);





// Server running route define
app.listen(5000, () => {
    console.log("server running at 5000")
}
)