//Description: Functions that make query request and return them in a form of object  (applied Data Access Layer (DAL))

const express = require ('express')
const router = express.Router()
const cors = require('cors')
const neo4j = require('neo4j-driver')
const _ = require('lodash')
const dalUser = require ('./dalUser.js')
const { first } = require('lodash')
const { json } = require('body-parser')
//const requireLogin = require('../middleware/requireLogin.js')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic())
const session = driver.session();

router.use(cors({ origin: true }));

module.exports ={
    getSession:function (context) {
        if(context.neo4jSession) {
          return context.neo4jSession;
        }
        else {
          context.neo4jSession = driver.session();
          return context.neo4jSession;
        }
    },

    //SAMPLE
    getCountries: function(req, res, next){
        const result = session.run('MATCH (c:COUNTRY) RETURN c')
        result
        .then(function (result){
            var countryArr = [];
            result.records.forEach(function(record){
                countryArr.push({
                    id: record._fields[0].identity.low, 
                    countryCode: record._fields[0].properties.CountryCode,
                    country: record._fields[0].properties.Country
                })
            });
            return res.send(JSON.stringify(countryArr))
        })
        .catch(function(err){
            console.log(err);
        }); 

    },

    //DONE
    getHill: function(req, res, next){
        const {firstName} = req.body
        //Make a condition to make sure [:VISITED] relationship doesn't exist //Only show WHERE NOT EXISTS
        //MATCH (u:USERTEST{firstName:'Nina'}), (h:HILL) WHERE NOT EXISTS((u)-[:VISITED]->(h)) return h
        //combine the two tomorrow. Try and test. 
        const result = session.run('MATCH (u:USERTEST{firstName: $firstName}), (h:HILL)'
                        +' WHERE NOT EXISTS((u)-[:VISITED]->(h)) return h LIMIT 80',{
                            firstName:firstName
                        })
        result
        .then(function (result1){
            var hillArr = [];
            result1.records.forEach(function(record){
                hillArr.push({
                    id: record._fields[0].identity.low, 
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    county:record._fields[0].properties.County,
                    metre:record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    feature:record._fields[0].properties.Feature,
                    parentName:record._fields[0].properties.ParentName,
                    drop:record._fields[0].properties.Drop,
                    area:record._fields[0].properties.Area,
                    region:record._fields[0].properties.Region
                })
            });
            return res.send(JSON.stringify(hillArr))
        })
        .catch(function(err){
            console.log(err);
        });
    },

    //DONE
    getContentBased: function(req, res, next){
        const {firstName} = req.body
        const contentBased = session
            .run('MATCH (test:USERTEST{firstName:$firstName})-[:VISITED]->(hill:HILL)<-[:HILLS]-(county:COUNTY2)'
            + 'MATCH (county)-[:HILLS]->(rec:HILL) WHERE NOT EXISTS ((test)-[:VISITED]->(rec))'
            + 'RETURN DISTINCT  rec ORDER BY rec.Metre DESC',
            {
                firstName: firstName,
                //hillName: hillName            
            })
            contentBased
            .then(function(result){
                if(_.isEmpty(result.records)){
                    return res.send({error:'Sorry, we cannot recommend anything until you have visited at least one hill'})
                }
                var contentBased = [];
                result.records.forEach(function(record){
                    contentBased.push({
                        id: record._fields[0].identity.low, 
                        countryCode: record._fields[0].properties.CountryCode,
                        hillName:record._fields[0].properties.HillName,
                        county:record._fields[0].properties.County,
                        metre:record._fields[0].properties.Metre,
                        feet:record._fields[0].properties.Feet,
                        feature:record._fields[0].properties.Feature,
                        parentName:record._fields[0].properties.ParentName,
                        drop:record._fields[0].properties.Drop,
                        area:record._fields[0].properties.Area,
                        region:record._fields[0].properties.Region
                    })
                })
                return res.send(JSON.stringify(contentBased))
            })
            .catch(function(err){
         });
    },

    //DONE
    getCollabFiltering: function(req, res, next){
        const {firstName} = req.body
        const collabFiltering = session
            .run('MATCH (u:USERTEST{firstName:$firstName})-[:VISITED]->(h:HILL)<-[:VISITED]-(p:USERTEST)-[:VISITED]->(rec:HILL)' 
                 +'WHERE NOT EXISTS ((u:USERTEST)-[:VISITED]->(rec)) RETURN DISTINCT rec ORDER BY rec.Metre DESC',{
                     firstName: firstName
            })
            collabFiltering
            .then(function(result){
                if(_.isEmpty(result.records)){
                    return res.send({error:'Apparently, no one has visited the hill you have visitied'})
                }
                var collabFiltering = [];
                result.records.forEach(function(record){
                    collabFiltering.push({
                        id: record._fields[0].identity.low, 
                        countryCode: record._fields[0].properties.CountryCode,
                        hillName:record._fields[0].properties.HillName,
                        county:record._fields[0].properties.County,
                        metre:record._fields[0].properties.Metre,
                        feet:record._fields[0].properties.Feet,
                        feature:record._fields[0].properties.Feature,
                        parentName:record._fields[0].properties.ParentName,
                        drop:record._fields[0].properties.Drop,
                        area:record._fields[0].properties.Area,
                        region:record._fields[0].properties.Region
                    })
                })
                return res.send(JSON.stringify(collabFiltering))

            })
            .catch(function(err){

        });
    },

    //DONE
    createCompletedHill: function(req, res, next){
        const {firstName, hillName, status} = req.body
        const findName = session
            .run('MATCH (a:USERTEST {firstName:$firstName}) RETURN a', {
                firstName: firstName
            })
            findName
            .then(function(result1){
                if(_.isEmpty(result1.records)){
                   return res.send('No user found')
                }
                const result = session
                .run('MATCH (u:USERTEST {firstName:$firstName}),(h:HILL{HillName:$hillName})'
                    +'CREATE (u)-[:VISITED {status:$status}]->(h) return u',{
                        firstName:firstName,
                        hillName:hillName,
                        status:status
                    })
                result
                .then(function(result){
                return res.send(JSON.stringify(firstName +' visited '+hillName))
                })

            })
            .catch(function(err){
                console.log(err)
            });
     },

     //DONE
    removeCompletedHill: function(req, res, next){
        //buat if relationship exist, tak yah :D
        const {firstName, hillName} = req.body
        const findName = session
            .run('MATCH (a:USERTEST {firstName:$firstName}) RETURN a', {
                firstName: firstName
            })
            findName
            .then(function(result1){
                if(_.isEmpty(result1.records)){
                    return res.send('No user found')
                }
                const result = session
                .run('MATCH (u:USERTEST {firstName:$firstName}),(h:HILL {HillName:$hillName})'
                    +'MATCH (u)-[v:VISITED]->(h) DELETE v return u',{
                        firstName:firstName,
                        hillName:hillName
                    })
                result
                .then(function(result){
                    return res.send(JSON.stringify(firstName +' removes '+hillName+' from their completed list'))
                })
    
            })
            .catch(function(err){
                console.log(err)
            });
    
         },

     //DONE
     getCompletedHill: function(req, res, next){
        const {firstName, hillName} = req.body
        const getCompleted = session
        .run('MATCH (test:USERTEST{firstName:$firstName})-[:VISITED]->(h) RETURN DISTINCT h',
         {
           firstName:firstName
        })
        getCompleted
        .then(function(result){
           if(_.isEmpty(result.records)){
            return res.send({error:'You have not visited any hill'})
           }
           var userCompleted = [];
           result.records.forEach(function(record){
               userCompleted.push({
                id: record._fields[0].identity.low, 
                countryCode: record._fields[0].properties.CountryCode,
                hillName:record._fields[0].properties.HillName,
                county:record._fields[0].properties.County,
                metre:record._fields[0].properties.Metre,
                feet:record._fields[0].properties.Feet,
                feature:record._fields[0].properties.Feature,
                parentName:record._fields[0].properties.ParentName,
                drop:record._fields[0].properties.Drop,
                area:record._fields[0].properties.Area,
                region:record._fields[0].properties.Region
               })
           })
           return res.send(JSON.stringify(userCompleted))
        })
        .catch(function(err){
           console.log(err)
       });

    },

    //DONE
    createHillsToHike: function(req, res, next){
    //buat if relationship exist, tak yah :D
    const {firstName, hillName, status} = req.body
    const findName = session
        .run('MATCH (a:USERTEST {firstName:$firstName}) RETURN a', {
            firstName: firstName
        })
        findName
        .then(function(result1){
            if(_.isEmpty(result1.records)){
                return res.send('No user found')
            }
            const result = session
            .run('MATCH (u:USERTEST{firstName:$firstName}),(h:HILL{HillName:$hillName})'
                +'CREATE (u)-[:HILLS_TO_HIKE {status:$status}]->(h) return DISTINCT u',{
                    firstName:firstName,
                    hillName:hillName,
                    status: status,
                })
            result
            .then(function(result){
                return res.send(JSON.stringify(firstName +' plan to visit '+hillName +'with status: '+status))
            })

        })
        .catch(function(err){
            console.log(err)
        });

     },

     //DONE
    removeHillsToHike: function(req, res, next){
        //buat if relationship exist, tak yah :D
        const {firstName, hillName} = req.body
        const findName = session
            .run('MATCH (a:USERTEST {firstName:$firstName}) RETURN a', {
                firstName: firstName
            })
            findName
            .then(function(result1){
                if(_.isEmpty(result1.records)){
                    return res.send('No user found')
                }
                const result = session
                .run('MATCH (u:USERTEST {firstName:$firstName}),(h:HILL {HillName:$hillName})'
                    +'MATCH (u)-[v:HILLS_TO_HIKE]->(h) DELETE v return u',{
                        firstName:firstName,
                        hillName:hillName
                    })
                result
                .then(function(result){
                    return res.send(JSON.stringify(firstName +' removes '+hillName+' from their favourite list'))
                })
    
            })
            .catch(function(err){
                console.log(err)
            });
    
         },

     //DONE
     getHillsToHike: function(req, res, next){
        const {firstName, hillName} = req.body
        const getCompleted = session
        .run('MATCH (test:USERTEST{firstName:$firstName})-[:HILLS_TO_HIKE]->(h) RETURN DISTINCT h',
         {
           firstName:firstName
        })
        getCompleted
        .then(function(result){
            if(_.isEmpty(result.records)){
             return res.send({error:'You have not added anything to your favourites list'})
           }
           var userCompleted = [];
           result.records.forEach(function(record){
               userCompleted.push({
                id: record._fields[0].identity.low, 
                countryCode: record._fields[0].properties.CountryCode,
                hillName:record._fields[0].properties.HillName,
                county:record._fields[0].properties.County,
                metre:record._fields[0].properties.Metre,
                feet:record._fields[0].properties.Feet,
                feature:record._fields[0].properties.Feature,
                parentName:record._fields[0].properties.ParentName,
                drop:record._fields[0].properties.Drop,
                area:record._fields[0].properties.Area,
                region:record._fields[0].properties.Region
               })
           })
           return res.send(JSON.stringify(userCompleted))
        })
        .catch(function(err){
           console.log(err)
       });

    },

    //DONE
    getHighestScotland: function(req, res, next){
        const {countryCode, firstName} = req.body
        const getHighestScotland = session
        .run('MATCH (h:HILL{CountryCode: $countryCode}) RETURN h ORDER BY h.Metre DESC LIMIT 10',
        {
            //firstName: firstName,
            countryCode:'S',
        })
        getHighestScotland
        .then(function(result){
            var highestScotland = [];
            result.records.forEach(function(record){
                highestScotland.push({
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    metre: record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    drop:record._fields[0].properties.Drop,
                })
            })
            return res.send(JSON.stringify(highestScotland))
        })
        .catch(function(err){
            console.log(err)
        });

    },

    //DONE
    getHighestEngland: function(req, res, next){
        const {countryCode, firstName} = req.body
        const getHighestEngland = session
        .run('MATCH (h:HILL{CountryCode: $countryCode}) RETURN h ORDER BY h.Metre DESC LIMIT 10',
        {
            //firstName: firstName,
            countryCode:'E',
        })
        getHighestEngland
        .then(function(result){
            var highestEngland = [];
            result.records.forEach(function(record){
                highestEngland.push({
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    metre: record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    drop:record._fields[0].properties.Drop,
                })
            })
            return res.send(JSON.stringify(highestEngland))
        })
        .catch(function(err){
            console.log(err)
        });

    },

    //DONE
    getHighestWales: function(req, res, next){
        const {countryCode, firstName} = req.body
        const getHighestWales = session
        .run('MATCH (h:HILL{CountryCode: $countryCode}) RETURN h ORDER BY h.Metre DESC LIMIT 10',
        {
            //firstName: firstName,
            countryCode:'W',
        })
        getHighestWales
        .then(function(result){
            var highestWales = [];
            result.records.forEach(function(record){
                highestWales.push({
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    metre: record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    drop:record._fields[0].properties.Drop,
                })
            })
            return res.send(JSON.stringify(highestWales))
        })
        .catch(function(err){
            console.log(err)
        });
    },

    //DONE
    getFamilyFriendly: function(req, res, next){
        const {countryCode, firstName} = req.body
        const getFamilyFriendly = session
        .run('MATCH (h:HILL) WHERE h.Metre < 447 RETURN h LIMIT 10')
        getFamilyFriendly
        .then(function(result){
            var familyFriendly = [];
            result.records.forEach(function(record){
                familyFriendly.push({
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    metre: record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    drop:record._fields[0].properties.Drop,
                })
            })
            return res.send(JSON.stringify(familyFriendly))
        })
        .catch(function(err){
            console.log(err)
        });
    },

    getClassifiedMountain: function(req, res, next){
        const {countryCode, firstName} = req.body
        const getClassifiedMountain = session
        .run('MATCH (h:HILL) WHERE h.Metre > 1000 RETURN h LIMIT 10')
        getClassifiedMountain
        .then(function(result){
            var classifiedMountain = [];
            result.records.forEach(function(record){
                classifiedMountain.push({
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    metre: record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    drop:record._fields[0].properties.Drop,
                })
            })
            return res.send(JSON.stringify(classifiedMountain))
        })
        .catch(function(err){
            console.log(err)
        });
    },

    getShareBorder: function(req, res, next){
        const {countryCode, firstName} = req.body
        const getShareBorder = session
        .run('MATCH(c:COUNTRY{CountryCode:$countryCode})-[:REGIONS]->(r)-[:AREAS]->(a)-[:COUNTIES]->(co)-[:HILLS]->(h)'
        + ' return distinct h ORDER BY h.Metre DESC LIMIT 10', {
            countryCode:'ES'
        })
        getShareBorder
        .then(function(result){
            var shareBorder = [];
            result.records.forEach(function(record){
                shareBorder.push({
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    metre: record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    drop:record._fields[0].properties.Drop,
                })
            })
            return res.send(JSON.stringify(shareBorder))
        })
        .catch(function(err){
            console.log(err)
        });
    },

    //SAMPLE
    getFilteredHills: function(req,res, next){
        const {countryCode, county, hill, metre} = req.body
        const result = session
        .run('MATCH (c:COUNTRY {CountryCode:$countryCode})-[:REGIONS]->(r:REGION)'+
            '-[:AREAS] ->(a:AREA)-[:COUNTIES]->(co:COUNTY2{County: $county})-[:HILLS]->(h:HILL)' +
            ' WHERE h.Metre > 200 return h', {
                countryCode:countryCode,
                county:county,
                hill:hill
                                
        })
        result
        .then(function (result1){
            if(_.isEmpty(result1.records)){
                res.send('No information inserted')
            }
            var filteredHills = [];
            result1.records.forEach(function(record){
                filteredHills.push({
                    hillName:record._fields[0].properties.HillName,
                })
            })
            return res.send(JSON.stringify(filteredHills))
        })
        .catch(function(err){
            console.log(err);
        })
    },


    //NOT IN USED
    getRelationship: function(req, res, next){
        const result = session.run('MATCH (test:USERTEST{name:$name})-[:VISITED]->(hill:HILL)<-[:HILLS]-(county:COUNTY2)'+
                                   'MATCH (county)-[:HILLS]->(rec:HILL) WHERE NOT EXISTS ((test)-[:VISITED]->(rec)) ' +
                                   'return rec.HillName, rec.County',
                                   {name: 'Test', hillName: rec.HillName})
        result
        .then(function (result){
            var relArr = [];
            result.records.forEach(function(record){
                relArr.push({
                   // id: record._fields[0].identity.low, 
                    hillName: record._fields[0].properties.HillName,
                    //country: record._fields[0].properties.Country
                })
            });
            res.send(JSON.stringify(relArr))
        })
        .catch(function(err){
            console.log(err);
        }); 

    },

    
    getEnglandHill: function (req, res, next){
        //put requireToken here????
        const result = session.run('MATCH (h:HILL{CountryCode: $countryCode}) return h LIMIT 75', {countryCode: 'E'})
        result
        .then(function (result){
            var engHillArr = [];
            result.records.forEach(function(record){
                engHillArr.push({
                    id: record._fields[0].identity.low, 
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    county:record._fields[0].properties.County,
                    metre:record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    feature:record._fields[0].properties.Feature,
                    parentName:record._fields[0].properties.ParentName,
                    drop:record._fields[0].properties.Drop,
                    area:record._fields[0].properties.Area,
                    region:record._fields[0].properties.Region
                    //country: record._fields[0].properties.Country
                })
            });
            res.send(JSON.stringify(engHillArr))
        })
        .catch(function(err){
            console.log(err);
        }); 

    },

    getScotlandHill: function (req, res, next){
        //put requireToken here????
        const result = session.run('MATCH (h:HILL{CountryCode: $countryCode}) return h LIMIT 75', {countryCode: 'S'})
        result
        .then(function (result){
            var scotHillArr = [];
            result.records.forEach(function(record){
                scotHillArr.push({
                    id: record._fields[0].identity.low, 
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    county:record._fields[0].properties.County,
                    metre:record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    feature:record._fields[0].properties.Feature,
                    parentName:record._fields[0].properties.ParentName,
                    drop:record._fields[0].properties.Drop,
                    area:record._fields[0].properties.Area,
                    region:record._fields[0].properties.Region
                    //country: record._fields[0].properties.Country
                })
            });
            res.send(JSON.stringify(scotHillArr))
        })
        .catch(function(err){
            console.log(err);
        }); 

    },

    getWalesHill: function (req, res, next){
        //put requireToken here????
        const result = session.run('MATCH (h:HILL{CountryCode: $countryCode}) return h LIMIT 75', {countryCode: 'W'})
        result
        .then(function (result){
            var walesHillArr = [];
            result.records.forEach(function(record){
                walesHillArr.push({
                    id: record._fields[0].identity.low, 
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    county:record._fields[0].properties.County,
                    metre:record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    feature:record._fields[0].properties.Feature,
                    parentName:record._fields[0].properties.ParentName,
                    drop:record._fields[0].properties.Drop,
                    area:record._fields[0].properties.Area,
                    region:record._fields[0].properties.Region
                    //country: record._fields[0].properties.Country
                })
            });
            res.send(JSON.stringify(walesHillArr))
        })
        .catch(function(err){
            console.log(err);
        }); 

    },

    getIrelandHill: function (req, res, next){
        //put requireToken here????
        const result = session.run('MATCH (h:HILL{CountryCode: $countryCode}) return h LIMIT 75', {countryCode: 'W'})
        result
        .then(function (result){
            var irelandHillArr = [];
            result.records.forEach(function(record){
                irelandHillArr.push({
                    id: record._fields[0].identity.low, 
                    countryCode: record._fields[0].properties.CountryCode,
                    hillName:record._fields[0].properties.HillName,
                    county:record._fields[0].properties.County,
                    metre:record._fields[0].properties.Metre,
                    feet:record._fields[0].properties.Feet,
                    feature:record._fields[0].properties.Feature,
                    parentName:record._fields[0].properties.ParentName,
                    drop:record._fields[0].properties.Drop,
                    area:record._fields[0].properties.Area,
                    region:record._fields[0].properties.Region
                    //country: record._fields[0].properties.Country
                })
            });
            res.send(JSON.stringify(irelandHillArr))
        })
        .catch(function(err){
            console.log(err);
        }); 

    },


    getUser: function(req,res, next){
        const {firstName, username, password} = req.body
        const result = session.run('MATCH (a:USERTEST) RETURN a')
        result
        .then(function (result){
            var userArr = [];
            result.records.forEach(function(record){
                userArr.push({
                    id: record._fields[0].identity.low, 
                    firstName: record._fields[0].properties.firstName,
                    lastName:record._fields[0].properties.lastName,
                    username:record._fields[0].properties.username,
                    password:record._fields[0].properties.password,
                })
            });
            res.send(JSON.stringify(userArr))
        })
        .catch(function(err){
            console.log(err);
        }); 


    }
    
}


