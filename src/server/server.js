//express definitions
const { login, compareCookie, refreshToken, setTokenResponse } = require('./authUtil')
const express = require('express')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const argon2 = require('argon2')
const cors = require('cors')
const _ = require('lodash')
const crypto = require('crypto')



const port = 8080
const a_secret = "rcwGtBwUCcOT5sPBUK58"
const r_secret = "zfcv6abC0MDpRK8DQ6lj"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))


app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

const mw = async (req, res, next) => {
    if (req.headers.authorization === undefined) 
        return next()

    if (_.includes(req.headers.authorization, "Basic")) 
        return next()
    
    const accessToken = req.headers.authorization.split(" ")[1]

    const { Fgp, RFgp } = req.cookies

    try {
        const { userFP, user } = jwt.verify(accessToken, a_secret, {
            algorithms: ['HS256'],
            userFP: crypto.createHash('sha256').update(Buffer.from(Fgp, 'hex').toString()).digest('hex')
        })
    }
    catch (e) {
        if (!(_.isEqual(e.name, "TokenExpiredError"))) 
            return res.status(401).send();

        const refreshedTokens = await refreshToken(accessToken, RFgp, a_secret, r_secret)
        
        if(_.isEmpty(refreshedTokens))
            return res.status(401).send();

        setTokenResponse(res, refreshedTokens)
        res.locals.newToken = refreshedTokens.token
    }
    next()
}

app.use(bodyParser.json())
app.use((cookieParser()));
app.use(mw)

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})

const { User, Deals } = require('./sequelize')

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

//auth
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

var upload = multer(({ storage: multer.memoryStorage() }))
var dealsUpload = upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'details', maxCount: 1 },
    { name: 'subDetails', maxCount: 1 },
])

//auth
app.post('/insertDeals', upload.single('logo'), (req, res) => {
    const deal = {
        ...req.body,
    }

    Deals.create(deal)
        .then(deal => res.json(deal))
        .catch()
});


app.get('/getDeals', (req, res) => {
    Deals.findAll({
        attributes: ['id', 'title', 'details', 'subDetails']
    })
        .then(list => {
            let deals = []
            _.forEach(list, (deal) => {
                deals.push(deal.dataValues)

            })

            return res.status(200)
                .send({
                    dealsList: deals,
                    token: res.locals.newToken
                });
        }
        )
        .catch(err => {
            return res.status(500);
        })

});


app.get('/login', (req, res) => {
    const userpass = req.headers.authorization.match(/\b(?!Basic)\b\S+/g)[0]

    if (userpass === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page").send("Internal Error")

    let decoded_user_pass = Buffer.from(userpass, 'base64').toString('ascii');

    if (decoded_user_pass === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page").send("Internal Error")

    let split = decoded_user_pass.split(':')

    const username = split[0]
    const password = split[1]

    if (username === undefined || password === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page").send("Internal Error")

    login(username, password, a_secret, r_secret)
        .then(value => {
            setTokenResponse(res, value)
            return res.status(200)
                .json({
                    token: value.token,
                });

        })
        .catch(err => {
            return res.status(401)
                .append("WWW-Authenticate", "xBasic realm=User Page")
                .json({
                    message: "Credentials incorrect or not found"
                })
        })

})

app.get('/logoutUser', (req, res) => {
    let options = {
        httpOnly: true,
        sameSite: 'strict',
        httpOnly: true,
        // secure: true
    }
    //MAKE SURE TO MAKE SECURE
    res.clearCookie("Fgp")
    res.clearCookie("RFgp")

    return res.status(200).send();
})
