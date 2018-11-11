const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home");
const chatController = require("../controllers/chat");

router.get('/', homeController.sendHomePage);
router.get('/chat', chatController.sendChatPage);


module.exports = router;
