const Router = require('express');
const router = new Router();
const controller = require('../controller/authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);
router.get('/auth', authMiddleware, controller.auth);
router.delete('/delete/:id', controller.deleteUser);

module.exports = router;
