function sendChatPage(req, res) {
    res.sendFile("chatPage.html", { root: 'server/views/' });
}


module.exports.sendChatPage = sendChatPage;