//express definitions
const express = require('express')
const bodyParser = require('body-parser')
const argon2 = require('argon2')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const mailer = require('./mailer')
const passport = require('passport')
const passportEmailVerify = require('./passportjwtverify')

const app = express()


app.use(bodyParser.json())
app.use(passport.initialize());


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

User.beforeCreate(user => {
    return argon2.hash(user.loyalty)
        .then(hash => {
            user.loyalty = hash
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


    console.log("BODY IS ", req.body)

    User.create(req.body)
        .then(user => res.json(user))
        .catch()
})

app.post('/sendverification', (req, res) => {

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        argon2.verify(user.loyalty, req.body.loyalty)
            .then(() => {
                const body = { id: req.body, email: req.body.email }
                console.log("BODY IS ", body)
                const token = jwt.sign({ user: body }, "VERKEY", { algorithm: 'HS256' })

                return res.status(200).send({
                    token: token,
                });

                // var mailInfo = {
                //     from: mailer.email,
                //     to: req.body.email,
                //     subject: 'Email Confirmation - Toronto Blizzard Loyalty Program',
                //     text: 'click here to verify: http://localhost:3000/'
                // }

                // mailer.transporter.sendMail(mailInfo, (err, info) => {
                //     if(err) {
                //         return res.sendStatus(400).send("Error sending verify email")
                //     } 
                //     else {
                //         return res.sendStatus(200).send(info)

                //     }
                // })
            })
            .catch(error => {
                console.log(error)
            })
    })
})

app.get('/verifyEmail', function (req, res, next) {
    passportEmailVerify.passport.authenticate("jwt", function (err, user, info) {
        if (err) {
            return res.sendStatus(400).send(err)
        }
        if (!user) return res.sendStatus(401)

        user.update({
            active: true
        }).then(info => res.sendStatus(200))
            .catch(err => res.sendStatus(400).send(err))


    })(req, res, next);
});

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
            .then((req) => {
                const body = { id: req.body, email: req.email }
                const token = jwt.sign({ user: body }, "MyS3cr3tK3Y", { algorithm: 'HS256' })

                return res.status(200).send({
                    token: token,
                    auth: true
                });
            })
            .catch(error => {
                console.log(error)
            })
    })
})