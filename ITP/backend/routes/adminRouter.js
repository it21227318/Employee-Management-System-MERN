const express = require('express')
const { AdminRegister, Signin, tokenRefresh, deleteAdmin } = require('../controllers/adminController')

const router = express.Router()

router.post('/Signup', AdminRegister);
router.post('/Signin', Signin);
router.post('/Token', tokenRefresh);
router.delete('/deleteAdmin/:id', deleteAdmin);

module.exports = router;
