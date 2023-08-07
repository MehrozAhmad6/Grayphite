const express = require('express');
const router = express.Router();
const {validateUserData,verifyToken} = require('./Middleware/Auth')
const {insertUser,updateUser,getUser,deleteUser,loginUser} = require('./userController/Routes')
router.use(express.json());
router.post('/insert',validateUserData,insertUser)
router.post('/update/:id',updateUser)  
router.delete('/delete/:id',deleteUser)
router.get('/get/:id',getUser)
router.post("/login", verifyToken,loginUser)
module.exports = router;