//express definitions
const express = require('express')
const bodyParser = require('body-parser')
const argon2 = require('argon2')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const app = express()
app.use(bodyParser.json())

const port = 8080
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

const { User } = require('./sequelize')

User.beforeCreate(user => {
    return argon2.hash(user.password)
    .then(hash => {
        user.password = hash
    })
    .catch()
})

app.post('/register', (req, res) => {
    if (_.isEmpty(req.body)) { 
        return res.sendStatus(400).send("Invalid body"); 
    }

    // if(req.body.username === undefined || req.body.password === undefined ) {
    //     return res.sendStatus(400).send()
    // }
    
    User.create(req.body)
    .then(user => res.json(user))
    .catch()
})

const config = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false //b/c using jwt
    }
}

app.get('/login', (req, res) => {
    // if (_.isEmpty(req.body)) { 
    //     return res.sendStatus(400).send("Invalid body"); 
    // }

    // if(req.body.username === undefined || req.body.password === undefined ) {
    //     return res.sendStatus(400).send("Invalid email or password")
    // }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        argon2.verify(user.password, req.body.password)
        .then( (req) => {
            const body = {id: req.body, email: req.email}
            const token = jwt.sign({user: body}, "MyS3cr3tK3Y", { algorithm: 'HS256'} )

            return  res.status(200).send({
                token: token,
                auth: true
            });
        })
        .catch(error => {
            console.log(error)
        })
    })
})