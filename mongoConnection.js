const mongoose = require('mongoose');
require('dotenv').config();
mongodbErrorHandler = require('mongoose-mongodb-errors');

mongoose.connect(process.env.MONGO_URL , { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.plugin(mongodbErrorHandler);

mongoose.connection
    .once("open", () => { console.log("database connected")})
    .on("error", (error) => { console.log("Your error: ", error)})
