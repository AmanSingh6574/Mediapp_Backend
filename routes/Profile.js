const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
  } = require("../controller/Profile");

router.put("/updateProfile" , auth , updateProfile);
router.delete("/deleteAccount" , auth , deleteAccount );
router.get("/getAllUserDetails" , auth , getAllUserDetails)

module.exports = router