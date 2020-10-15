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
    try {
        const payload ={
            name: req.body.name,
            budget: req.body.budget,
        }
        if(!payload.name || !payload.budget){
            res.status(400).json({
                message: "Need a name and a budget"
            })
        }
        const [id] = await db
        .insert(payload)
        .into('accounts')

        const account = await db
        .first("*")
        .from("accounts")
        .where("id", id)
        
        res.status(201).json(account)
    } catch (err) {
        next(err)
    }
})
//CREATE new account

router.put("/:id", async (req, res, next) => {
    try {
        const payload ={
            name: req.body.name,
            budget: req.body.budget,
        }
        if(!payload.name || !payload.budget){
            res.status(400).json({
                message: "Need a name and a budget"
            })
        }
        //UPDATE accounts SET name=? AND budget=? WHERE id=?
        await db('accounts')
        .update(payload)
        .where('id', req.params.id)
        
        const account = await db
        .first("*")
        .from("accounts")
        .where("id", req.params.id)

        res.json(account)

    } catch (err) {
        next(err)
    }
})
//EDIT an account

router.delete("/:id", async (req, res, next) => {
    try {
        //DELETE FROM accounts WHERE id = ?
        await db('accounts')
        .where('id', req.params.id)
        .del()

        res.status(204).end()

    } catch (err) {
        next(err)
    }
})
//DELETE an account


module.exports = router