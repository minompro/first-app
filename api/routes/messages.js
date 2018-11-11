const app = require("express");
const router = app.Router();
const messageController = require("../controllers/messages");

router.get('/messages', messageController.getNewMessages);
router.post('/messages', messageController.sendNewMessage);


module.exports = router;











