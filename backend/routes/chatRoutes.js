const { accessChat, getchat } = require('../controllers/chatControllers');

const  router = require ('express').Router();


router.post('/send/:id',accessChat);
router.get('/read/:id',getchat);








module.exports = router