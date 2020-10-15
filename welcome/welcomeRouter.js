const express = require("express")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json({
			message: "AYYYYY whats up! 🔥 ",
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router