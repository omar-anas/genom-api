const router = require("express").Router();
const { publicPosts, privatePosts } = require("../database");
const authToken = require("../middleware/authenticateToken");
const userAuthorization = require("../middleware/userAuthorization");
const {executeQuery}  = require('../db/execute');
const gymCreationController = require('../controllers/gymCreationController');
const { addGym } = require("../controllers/gymCreationController");

router.get("/getGym", authToken , userAuthorization , gymCreationController.getAllGyms );

router.get("/getGym/:gymID", authToken , userAuthorization , gymCreationController.getSpecificGym );

router.get("/getModule", authToken , userAuthorization , gymCreationController.getAllModules);

router.get("/getGYMSubscribedModule/:gymID", authToken , userAuthorization , gymCreationController.getSubscribedModule);

router.post("/addGYM", authToken , userAuthorization , gymCreationController.addGym);

router.post("/editGYM", authToken , userAuthorization , gymCreationController.editGym);

router.get("/getBranch/:gymID", authToken , userAuthorization , gymCreationController.getGymBranch);

router.get("/getSection/:gymID", authToken , userAuthorization ,gymCreationController.getGymSection);

router.get("/getGYMOwnerUser/:gymID", authToken , userAuthorization ,gymCreationController.getGymOwner);

router.post("/addBranch", authToken , userAuthorization , gymCreationController.addBranch);

router.post("/editBranch", authToken , userAuthorization ,gymCreationController.editBranch);

router.post("/addSection", authToken , userAuthorization , gymCreationController.addSection);

router.post("/editSection", authToken , userAuthorization , gymCreationController.editSection);

router.post("/addOwnerUser", authToken , userAuthorization , gymCreationController.addOwnerUser);

router.post("/editOwnerUser", authToken , userAuthorization ,gymCreationController.editOwnerUser);





module.exports = router;
