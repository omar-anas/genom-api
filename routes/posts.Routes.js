const router = require("express").Router();
const authToken = require("../middleware/authenticateToken");
const userAuthorization = require("../middleware/userAuthorization");
const postsController = require('../controllers/postsController');



router.get("/public", postsController.getPublicPosts);

router.get("/private", authToken , userAuthorization ,postsController.getPrivatePosts);

module.exports = router;
