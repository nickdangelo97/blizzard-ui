//express definitions
const express = require('express')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const argon2 = require('argon2')
const cors = require('cors')
const _ = require('lodash')
const querystring = require('querystring');

const
    {
        login,
        setTokenResponse,
        genResetToken,
        checkAdmin,
        a_secret, 
        r_secret,
        reset_secret
    } = require('./authUtil')
const { sendResetLink } = require('./mailer')
const { auth } = require('./middleware/auth')



const port = 8080

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((cookieParser()));
app.use(auth)

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    })
);

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


app.post('/register', async (req, res) => {
    checkAdmin(res)

    if (_.isEmpty(req.body)) {
        return res.sendStatus(400).send("Invalid body");
    }

    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).send("Register: Database error."))
})


var upload = multer(({ storage: multer.memoryStorage() }))
var dealsUpload = upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'details', maxCount: 1 },
    { name: 'subDetails', maxCount: 1 },
])


app.post('/insertDeals', upload.single('logo'), async (req, res) => {
    checkAdmin(res)

    Deals.create(req.body)
        .then(deal => res.json(deal))
        .catch(err => res.status(500).send("Error inserting deal."))
});


app.get('/getDeals', async (req, res) => {
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
                    message: "Could not fetch active deals."
                });
        })

});


app.get('/sendResetLink', async (req, res) => {
    const email = res.locals.email

    const u = await User.findOne({
        where: {
            Email: email
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
    const email = res.locals.email
    
    let newPassHash = await argon2.hash(res.locals.password)

    if (email === undefined || newPassHash === undefined)
        return res.status(500)
            .send({
                message: "Internal Error"
            })

    const changed = await User.update(
        {
            Password: newPassHash,
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


app.get('/login', async (req, res) => {
    login(res.locals.email, res.locals.password, a_secret, r_secret)
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


app.get('/logoutUser', async (req, res) => {
    res.clearCookie("Fgp")
    res.clearCookie("RFgp")

    return res.status(200).send();
})
