//====================================================================
//    CODE WORKS IN API TESTING, NOT ON APP. CODE NOT USED
//====================================================================


const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key.js')
const _ = require('lodash')
const neo4j = require('neo4j-driver');
const express = require ('express')
const app = express()
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic())
const session = driver.session();


module.exports = (req, res, next) =>{
    const {authorization}= req.header
    try{
        //authorization === Bearer {token}
        if (!authorization){
            console.log('Whop whop')
            return res.status(401).json({error:"You must log in!"})    
        }
        console.log('Do Whop!')

        //verify it's the same token the server gave. Send it back to server
        const secretKey = authorization.replace("Bearer ","")
        jwt.verify(secretKey, JWT_SECRET, async (err,payload) =>{
        if(err){
            res.status(401).json({error:"You must be logged in"})
        }
        try{    
            const {secretKey} = payload
            const result = session.run('MATCH (a:USERTEST {secretKey:$secretKey})RETURN a', {
                    secretKey: secretKey
                })
                result
                .then(results => {
                    console.log('Cool Dawg')
                    return _.get(results.records[0].get('a'), 'properties')
                })
                .then(userdata =>{
                    req.user = userdata;
                    next()
                })    
        }
        catch (err){
            console.log(err);
        } 
        })
    }
    catch (err){
        console.log('The error is: '+ err)
    }
    
}
 