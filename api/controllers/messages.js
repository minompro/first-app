const mongoose = require("mongoose");
const Message = mongoose.model("Message");


function sendJsonResponse(res, status, data) {
    res.status(status);
    res.json(data);
}


function getNewMessages(req, res) {
    Message.find({})
        .then(data => sendJsonResponse(res, 200, data))
        .catch(error => {
            console.error(`Cannot read data from database. Reason: ${error.message}`);
            res.sendStatus(500);
        });
}


function sendNewMessage(req, res) {    
    new Message(req.body).save()    
        .then(() => res.sendStatus(201))
        .catch(error => {
            console.error(`Cannot insert to database. Reason: ${error.message}`);
            res.sendStatus(500);            
        })        
}

module.exports.getNewMessages = getNewMessages;
module.exports.sendNewMessage = sendNewMessage;


