const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/institute-api", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("connection is successful...");
}).catch(() => {
    console.log("No connection.");
});