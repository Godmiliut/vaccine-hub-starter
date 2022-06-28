const express = require("express")
const router = express.Router()

router.post("/login", async (req, res, next) =>{
    try {
        //retrieve the required body in order to authenticate the user login
    } catch(err){
        next(err)
    }
})

router.post("/register", (req, res, next) =>{
    try {
        //retrieve the required body and create an user profile
    } catch(err){
        next(err)
    }
})

module.exports = router