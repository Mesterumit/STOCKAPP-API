// "use strict"

const router = require('express').Router()
// /* ------------------------------------------------------- */

// const {isLogin} = require('../middlewares/permissions')
const user = require('../controllers/user');

// router.use(isLogin)

router.route('/')
    .get(user.list)
    .post(user.register)

// router.route('/:id')
//     .get(user.read) 
//     .put(user.update)
//     .patch(user.update)
//     .delete(user.delete)

// module.exports = router;
