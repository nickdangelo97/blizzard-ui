const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { User } = require('./sequelize')
const argon2 = require('argon2')
const _ = require('lodash')


const a_secret = "rcwGtBwUCcOT5sPBUK58"
const r_secret = "zfcv6abC0MDpRK8DQ6lj"
const reset_secret = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIjDwvGCsl/WrYN08kw5lI7eBH9e07jX"

const genRandHash = () => {
    const randfp = crypto.randomBytes(50)
    return {
        value: Buffer.from(randfp).toString('hex'),
        hash: crypto.createHash('sha256').update(randfp.toString()).digest('hex')
    }
}


const genAccessToken = async (userID, SECRET1, SECRET2) => {
    const a_rand = genRandHash()
    const r_rand = genRandHash()

    const accessToken = {
        token: jwt.sign(
            {
                refreshToken: jwt.sign(
                    {
                        userFP: r_rand.hash,
                        userID: userID
                    },

                    SECRET2,

                    {
                        algorithm: 'HS256',
                        expiresIn: '1d'
                    }
                ),
                userFP: a_rand.hash,
                userID: userID,
            },

            SECRET1,

            {
                algorithm: 'HS256',
                expiresIn: '1m'
            }
        ),

        fp: a_rand,
        rfp: r_rand
    }

    return {
        ...accessToken
    }
}


const genRefreshToken = async (token, RFgp, SECRET1, SECRET2) => {
    let id = -1
    let { refreshToken } = jwt.decode(token)

    try {
        let { userID } = jwt.verify(refreshToken, SECRET2, { algorithms: ['HS256'], userFP: crypto.createHash('sha256').update(Buffer.from(RFgp, 'hex').toString()).digest('hex') })
        id = userID
    }
    catch (e) {
        return {}
    }

    let newToken = await genAccessToken(id, SECRET1, SECRET2)

    return {
        ...newToken
    }

}


const genResetToken = async (userID, reset_secret) => {
    return await jwt.sign(
        {
            userID: userID
        },
        reset_secret,
        {
            algorithm: 'HS256',
            expiresIn: '1d'
        }
    )
}


const setTokenResponse = (res, tokens) => {
    let options = {
        httpOnly: true,
        sameSite: 'strict',
        secure: true
    }
    res.cookie("Fgp", tokens.fp.value, options)
    res.cookie("RFgp", tokens.rfp.value, options)
    res.append("X-Auth-Token", tokens.token)
    return res
}


const login = async (email, password, SECRET1, SECRET2) => {
    const user = await User.findOne({
        where: {
            Email: email
        },
        attributes: ['id', 'Password', 'active', 'Name', 'Year_of_Birth', 'U', 'Gender', 'Phone', 'Loyalty',
            'Email', 'Address', 'City', 'ProvinceORState', 'ZipORPostal', 'Country']
    })

    if (!user) {
        throw new Error("Email not found");
    }

    const valid = await argon2.verify(user.Password, password)

    if (!valid)
        throw new Error("Credentials incorrect")

    const accessToken = await genAccessToken(user.id, SECRET1, SECRET2)

    user.Password = undefined

    return {
        ...accessToken,
        user
    }
}


const checkAdmin = (res) => {
    if (res.locals.user.type !== "admin")
        return res.sendStatus(403)
}


const getBasicCredentials = (req, res) => {
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

    const email = split[0]
    const password = split[1]

    if (email === undefined || password === undefined)
        return res.status(401).append("WWW-Authenticate", "xBasic realm=User Page")
            .send({
                message: "Internal Error"
            })

    return {
        email, 
        password
    }

}


module.exports = {
    login,
    genAccessToken,
    genRefreshToken,
    setTokenResponse,
    genResetToken,
    checkAdmin,
    getBasicCredentials,
    a_secret,
    r_secret,
    reset_secret
}
