const Router = require("express").Router
const userController = require("../controller/user-controller")
const authMiddleware = require("../middleware/auth-middleware")
const adminMiddleware = require("../middleware/admin-middleware")
const {body} = require("express-validator")

const router = new Router()


router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', adminMiddleware, userController.getUsers)


module.exports = router
