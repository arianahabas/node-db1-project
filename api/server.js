const express = require("express");
const welcomeRouter = require('../welcome/welcomeRouter')
const accountsRouter = require('../accounts/accountsRouter')

const db = require("../data/dbConfig.js");

const server = express();
const port = process.env.PORT || 4001


server.use(express.json());
server.use('/', welcomeRouter)
server.use('/accounts', accountsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})


module.exports = server;
