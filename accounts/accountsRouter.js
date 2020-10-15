const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
        //SELECT * FROM accounts
        const accounts = await db
        .select("*")
        .from("accounts")
        res.json(accounts)
	} catch (err) {
		next(err)
	}
}) 
//GET All accounts

router.get("/:id", async (req, res, next) => {
    try {
        //SELECT * FROM accounts WHERE id=? LIMIT 1;
        const account = await db 
        .select("*")
        .from("accounts")
        .where("id", req.params.id)
        .limit(1)
        res.json(account[0])
    } catch (err){
        next(err)
    }
})
//GET account by ID

router.post("/", async (req, res, next) => {

})
//CREATE new account

router.put("/:id", async (req, res, next) => {

})
//EDIT an account

router.delete("/:id", async (req, res, next) => {

})
//DELETE an account


module.exports = router