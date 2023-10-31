const Router = require("express").Router;
const postController = require("../controller/post-controller");
const AuthMiddleware = require("../middleware/auth-middleware");

const router = new Router();

router.get("/all", AuthMiddleware, postController.getAllPosts);
router.get("/:id", AuthMiddleware, postController.getPost);
router.post("/create", AuthMiddleware, postController.createPosts);
router.put("/update/:id", AuthMiddleware, postController.updatePost);
router.delete("/delete/:id", AuthMiddleware, postController.deletePost);

module.exports = router;
