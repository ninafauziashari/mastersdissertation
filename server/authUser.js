//Description: Router for user-based pages like login and registration  (which takes dalUser references)

const express = require ('express')
const router = express.Router()
//const app = express()
const bodyParser = require('body-parser')
const dal = require('./dal.js')
const jwt = require ('jsonwebtoken')
const {JWT_SECRET} = require('../config/key.js')
const dalUser = require('./dalUser.js')
const neo4j = require('neo4j-driver')
const cors = require('cors')
const _ = require('lodash')
const requireLogin = require('../middleware/requireLogin.js')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic())
const session = driver.session();
const PORT = process.env.PORT||3000;

router.use(cors({ origin: true }));

router.post('/register', function(req, res, next){
    dalUser.registration(req, res, function(stat, err, data){       
    })
})

router.post('/login', async (req, res) => {
    await dalUser.login(req, res, function(stat, err, data){ 
    })
})

module.exports = router