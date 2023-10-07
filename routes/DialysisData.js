const express = require("express")
const router = express.Router()
const {auth} = require("../middlewares/auth")


const {
    AddData , UpdateData
} = require("../controller/DialysisData");

router.post("/AddData" , auth , AddData);
router.put("/UpdateData" , auth , UpdateData);

module.exports = router