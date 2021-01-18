//Description: Router for pages (which takes dal references)

const express = require ('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dal = require('./dal.js')
const neo4j = require('neo4j-driver')
const cors = require('cors')
const _ = require('lodash')
const requireLogin = require('../middleware/requireLogin.js')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic())
const session = driver.session();
const PORT = process.env.PORT||3000;

router.use(cors({ origin: true }));
/*app.use(bodyParser.json())
app.use(cors({ origin: true }));*/

//NOT IN USED
router.get('/country', function(req, res, next){
    dal.getCountries(req, res, function(stat, err, data){

    })
});

router.post('/hill', (req,res,next)=>{
    dal.getHill(req, res, function(stat, err, data){
        console.log('Reached here.')    
    })  
});

router.post('/hill/createCompleted', function(req, res, next){
    dal.createCompletedHill(req, res, function(stat, err, data){
    })
})

router.post('/hill/removeCompletedHill', function(req, res, next){
    dal.removeCompletedHill(req, res, function(stat, err, data){
    })
})

//may rename this endpoint
router.post('/hill/completedHill', function(req, res, next){ 
    dal.getCompletedHill(req, res, function(stat, err, data){  
    })
})

router.post('/hill/createHillsToHike', function(req, res, next){
    dal.createHillsToHike(req, res, function(stat, err, data){
    })
})

router.post('/hill/removeHillsToHike', function(req, res, next){
    dal.removeHillsToHike(req, res, function(stat, err, data){
    })

})


router.post('/hill/hillsToHike', function(req, res, next){
    dal.getHillsToHike(req, res, function(stat, err, data){  
    })
})


router.post('/hill/completed/cb', function(req, res, next){
    dal.getContentBased (req, res, function (stat, err, data){
    })
})

router.post('/hill/completed/cf', function(req, res, next){
    dal.getCollabFiltering(req, res, function(stat, err, data){
    })
})

router.get('/hill/highestScotland', function(req, res, next){
    dal.getHighestScotland(req, res, next, function(stat, err, data){
        next()
    })
})

router.get('/hill/highestEngland', function(req, res, next){
    dal.getHighestEngland(req, res, next, function(stat, err, data){
        next()
    })
})

router.get('/hill/highestWales', function(req, res, next){
    dal.getHighestWales(req, res, next, function(stat, err, data){
        //next()
    })
})

router.get('/hill/familyFriendly', function(req, res, next){
    dal.getFamilyFriendly(req, res, next, function(stat, err, data){
    })
})

router.get('/hill/classifiedMountain', function(req, res, next){
    dal.getClassifiedMountain(req, res, next, function(stat, err, data){
    })
})

router.get('/hill/shareBorder', function(req, res, next){
    dal.getShareBorder(req, res, next, function(stat, err, data){
    })
})




//SAMPLE(S)========================================================


router.post('/hill/filter', function (req, res, next){
    dal.getFilteredHills(req, res, function (stat, err, data){
    })
})

router.get('/engHill', requireLogin, function(req,res){
    dal.getEnglandHill(req, res, function(stat, err, data){

    })
})

module.exports = router
