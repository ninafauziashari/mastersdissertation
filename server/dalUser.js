//Description: Functions that make query request for users and return them in a form of object  (applied Data Access Layer (DAL))

const express = require ('express')
const router = express.Router()
const cors = require('cors')
const neo4j = require('neo4j-driver')
const _ = require('lodash')
const jwt = require ('jsonwebtoken')
const {JWT_SECRET} = require('../config/key.js')
const randomstring = require('randomstring')


const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic())
const session = driver.session();

router.use(cors({ origin: true }));

module.exports = {
    registration: function (req, res, next){
        const {firstName, lastName, username, password, secretKey} = req.body
        const findUsername = session.run('MATCH (a:USERTEST {username:$username}) RETURN a',{
            username:username
        })
        .then(function(result1){
            if(!_.isEmpty(result1.records)){
                return res.send({error:'USERNAME IS TAKEN'})
            }
            const result = session.run('CREATE (a:USERTEST{firstName:$firstName, lastName:$lastName, '
                                    +'username:$username, password:$password, secretKey:$secretKey}) return a', {
            firstName: firstName, 
            lastName: lastName,
            username: username, 
            password: password,
            secretKey: randomstring.generate({
                length: 20,
                charset: 'hex'
            })
         })
         result
         .then (result => {
             return res.send({user:{firstName, lastName, username}})
           //return res.send(JSON.stringify('Thank you for joining, ' + firstName))
         })
        })
        /* */
         .catch(function(err){
            console.log(err);
        }); 
    },

    login: async function (req, res){
        // var getAuthenticationToken = () => 'successful token';
         const username = _.get(req.body, 'username');
         const password = _.get(req.body, 'password');
         //const firstName = _.get(req.body, 'firstName')

         const result = session.run('MATCH (a:USERTEST {username:$username}) RETURN a', {
             username: username
         })
         result
         .then(results => {
             if(_.isEmpty(results.records)){
                 return res.send({error: 'USERNAME DOES NOT EXIST'})
             }
             else
             {
                 //Get authentication token from the server
                const user =  _.get(results.records[0].get('a'), 'properties');
                if (user.password != (username,password)){
                   // console.log('Wrong credentials')
                    return res.send({error:'WRONG CREDENTIALS, PLEASE CHECK AGAIN'})                    
                }
                else{
                    const firstName = user.firstName
                    const secretKey = {secretKey: _.get(user, 'secretKey')}
                    //const secretKey = {secretKey: _.get(user, 'secretKey')}
                    const token = jwt.sign(secretKey,JWT_SECRET)
                    console.log('dalUser '+ JSON.stringify(token))
                    console.log('dalUser Test:' + JSON.stringify(user.firstName))
                    //return {token:_.get(user, 'secretKey')}
                    return res.send({token, user: {firstName, username, password}}) 
                 }
             }
         })
         .catch(function(err){
             console.log(err);
         })
     }

}