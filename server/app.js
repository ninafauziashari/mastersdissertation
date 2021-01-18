//Description: Server entry point

const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const neo4j = require('neo4j-driver')
const cors = require('cors')
const _ = require('lodash')
const requireLogin = require('../middleware/requireLogin.js')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic())
const session = driver.session();
const PORT = process.env.PORT||3000;

app.use(bodyParser.json())
app.use(cors({ origin: true }));

app.use(express.json())
app.use(require('./authUser'))
app.use(require('./authPage'))
    
//port and callback
app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;