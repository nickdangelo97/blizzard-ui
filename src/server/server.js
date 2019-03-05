//express definitions
const express = require('express')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const argon2 = require('argon2')
const cors = require('cors')
const _ = require('lodash')
const crypto = require('crypto')
const path = require('path');
const querystring = require('querystring');

const
    {
        login,
        refreshToken,
        setTokenResponse,
        genResetToken,
        checkAdmin
    } = require('./authUtil')
const { sendResetLink } = require('./mailer')



const port = 8080
const a_secret = "rcwGtBwUCcOT5sPBUK58"
const r_secret = "zfcv6abC0MDpRK8DQ6lj"
const reset_secret = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIjDwvGCsl/WrYN08kw5lI7eBH9e07jX"

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use( express.static("src" + path.sep + "assets") )


app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

const mw = async (req, res, next) => {
    if (_.includes(req.headers.authorization, "Basic"))
        return next()

    const accessToken = req.headers.authorization.split(" ")[1]

    const reset = jwt.verify(accessToken, reset_secret, {
        algorithms: ['HS256'],
    }, (err, decoded) => {
        if(err) 
            return false


            return true
    })
    
    if(reset)
        return next()

    const { Fgp, RFgp } = req.cookies

    try {
        const { userFP, userID } = jwt.verify(accessToken, a_secret, {
            algorithms: ['HS256'],
            userFP: crypto.createHash('sha256').update(Buffer.from(Fgp, 'hex').toString()).digest('hex')
        })


        const user = await User.findOne({
            where: {
                id: userID
            },
        })

        if (!user)
            throw new Error("User not found");

        res.locals.user = user
    }
    catch (e) {
        if (!(_.isEqual(e.name, "TokenExpiredError")))
            return res.status(401)
                .send({
                    message: e.message
                });

        const refreshedTokens = await refreshToken(accessToken, RFgp, a_secret, r_secret)

        if (_.isEmpty(refreshedTokens))
            return res.status(401).send();

        setTokenResponse(res, refreshedTokens)
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
    return argon2.hash(user.Password)
        .then(hash => {
            user.Password = hash
        })
        .catch()
})  

app.post('/register', (req, res) => {
    checkAdmin(res)

    if (_.isEmpty(req.body)) {
        return res.sendStatus(400).send("Invalid body");
    }

    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).send("Profile already exists."))
})

var upload = multer(({ storage: multer.memoryStorage() }))
var dealsUpload = upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'details', maxCount: 1 },
    { name: 'subDetails', maxCount: 1 },
])

app.post('/insertDeals', upload.single('logo'), (req, res) => {
    checkAdmin(res)

    Deals.create(req.body)
        .then(deal => res.json(deal))
        .catch(err => res.status(500).send("Error inserting deal."))
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
                });
        })
        .catch(err => {
            return res.status(500)
                .send({
                    message: err.message
                });
        })

});


app.get('/sendResetLink', async (req, res) => {
    const credentials = _.get(req.headers, "authorization", null)

    if(!credentials)
        return res.status(400).send({
            message: "Invalid Request"
        }) 

    let decodedCredentials = Buffer.from(credentials.match(/\b(?!Basic)\b\S+/g)[0], 'base64').toString('ascii');

    if (decodedCredentials === undefined)
        return res.status(400)
            .send({
                message: "Internal Error"
            })

    const u = await User.findOne({
        where: {
            Email: decodedCredentials.split(":")[0]
        },
    })

    if (!u)
        return res.status(401).send({
            message: "User not found"
        })


    const changed = await User.update(
        {
            active: false
        },
        {
            where: {
                id: u.id
            }
        }
    )

    if (!changed[0])
        return res.status(500).send({
            message: "Internal Service Error"
        })

    const t =  await genResetToken(u.id, reset_secret)

    sendResetLink(u.Name, ("http://localhost:3000/reset_pass?" +  querystring.stringify({token: t})), res)
    
})


app.post('/setPass', async (req, res) => {
    const credentials = _.get(req.headers, "authorization", null)

    if (!credentials)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    let decodedCredentials = Buffer.from(credentials.match(/\b(?!Basic)\b\S+/g)[0], 'base64').toString('ascii');

    if (decodedCredentials === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    let split = decodedCredentials.split(":")
    let email = split[0]
    let newPass = await argon2.hash(split[1])

    if (email === undefined || newPass === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    const changed = await User.update(
        {
            Password: newPass,
            active: true
        },
        {
            where: {
                Email: email
            }
        }
    )

    if (!changed[0])
        return res.status(500).send({
            message: "Internal Service Error"
        })


    return res.status(200).send()

});

app.get('/getUser', async (req, res) => {
    const token = _.get(req.headers, 'authorization').split(" ")[1]

    const data = jwt.decode(token)

    const u = await User.findOne({
        where: {
            id: data.userID
        },
        attributes: ['id', 'active', 'Name', 'Year_of_Birth', 'U', 'Gender', 'Phone', 'Loyalty',
            'Email', 'Address', 'City', 'ProvinceORState', 'ZipORPostal', 'Country']
    })

    if (!u)
        return res.status(401).send({
            message: "User not found"
        })

    return res.status(200).send({
        user: u
    })
})


app.get('/login', (req, res) => {
    const userpass = req.headers.authorization.match(/\b(?!Basic)\b\S+/g)[0]

    if (userpass === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    let decoded_user_pass = Buffer.from(userpass, 'base64').toString('ascii');

    if (decoded_user_pass === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    let split = decoded_user_pass.split(':')

    const username = split[0]
    const password = split[1]

    if (username === undefined || password === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    login(username, password, a_secret, r_secret)
        .then(value => {
            setTokenResponse(res, value)
            return res.status(200)
                .send({
                    user: value.user
                })

        })
        .catch(err => {
            return res.status(401)
                .append("WWW-Authenticate", "xBasic realm=User Page")
                .send({
                    message: err.message
                })
        })

})

app.get('/logoutUser', (req, res) => {
    let options = {
        httpOnly: true,
        sameSite: 'strict',
        // httpOnly: true,
        // secure: true
    }
    //MAKE SURE TO MAKE SECURE
    res.clearCookie("Fgp")
    res.clearCookie("RFgp")

    return res.status(200).send();
})
