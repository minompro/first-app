function sendHomePage(req, res) {
    res.sendFile("homePage.html", { root: 'server/views/' });
}


module.exports.sendHomePage = sendHomePage;
