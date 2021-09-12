const mongoose = require("mongoose");


mongoose.connect(process.env.CONN , {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("connection is successful...");
}).catch(() => {
    console.log("No connection.");
});