const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { User } = require('./sequelize')
const argon2 = require('argon2')



const genRandHash = () => {
    const randfp = crypto.randomBytes(50)
    console.log("RAND IS ", crypto.createHash('sha256').update(randfp.toString()).digest('hex'))
    return {
        value: Buffer.from(randfp).toString('hex'),
        hash: crypto.createHash('sha256').update(randfp.toString()).digest('hex')
    }
}


const genTokens = async (userId, SECRET1, SECRET2) => {
    const a_rand = genRandHash()
    const r_rand = genRandHash()

    const accessToken = {
        token: jwt.sign(
            {
                refreshToken: jwt.sign(
                    {
                        userFP: r_rand.hash,
                        user: userId
                    },

                    SECRET2,

                    {
                        algorithm: 'HS256',
                        expiresIn: '1d'
                    }
                ),
                userFP: a_rand.hash,
                user: userId,
            },

            SECRET1,

            {
                algorithm: 'HS256',
                expiresIn: '5s'
            }
        ),

        fp: a_rand,
        rfp: r_rand
    }

    return {
        ...accessToken
    }
}

const refreshToken = async (token, RFgp, SECRET1, SECRET2) => {
    let id = -1
    let { refreshToken } = jwt.decode(token)



    try {
        let { user } = jwt.verify(refreshToken, SECRET2, { algorithms: ['HS256'], userFP: crypto.createHash('sha256').update(Buffer.from(RFgp, 'hex').toString()).digest('hex') })
        id = user
    }
    catch (e) {
        console.log("REFRESH ERROR IS ", e)
        return {}
    }

    let newToken = await genTokens(id, SECRET1, SECRET2)

    return {
        ...newToken
    }

}

const setTokenResponse = (res, tokens) => {
    let options = {
        httpOnly: true,
        sameSite: 'strict',
        httpOnly: true,
        // secure: true
    }
    //MAKE SURE TO MAKE SECURE
    res.cookie("Fgp", tokens.fp.value, options)
    res.cookie("RFgp", tokens.rfp.value, options)
    // .append("Set-Cookie", "__Secure-Fgp=" + tokens.accessToken.fp.value + "; SameSite=Strict; HttpOnly=falsex; Secure")
    // .append("Set-Cookie", "__Secure-RFgp=" + tokens.refreshToken.fp.value + "; SameSite=Strict; HttpOnly; Secure")
    return res
}

const login = async (username, password, SECRET1, SECRET2) => {
    const user = await User.findOne({
        where: {
            email: username
        }
    })

    if (!user) {
        throw new Error("Credentials not found");
    }

    const valid = await argon2.verify(user.password, password)

    if (!valid)
        throw new Error("Credentials not found")

    const accessToken = await genTokens(user.id, SECRET1, SECRET2)

    return {
        ...accessToken,
    }
}


module.exports = {
    login,
    genTokens,
    refreshToken,
    setTokenResponse
}