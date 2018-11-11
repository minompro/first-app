const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    userName: String,
    messageText: String
});


mongoose.model("Message", messageSchema);