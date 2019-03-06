const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const _ = require('lodash')

const
    {
        genRefreshToken,
        setTokenResponse,
        getBasicCredentials,
        a_secret, 
        r_secret,
        reset_secret
    } = require('../authUtil')

const { User, Deals } = require('../sequelize')


const auth = async (req, res, next) => {
    if(req.headers.authorization === undefined)
        return res.status(401).send()
    
    if (_.includes(req.headers.authorization, "Basic")) {
        const { email, password } = getBasicCredentials(req, res)
        res.locals.email = email
        res.locals.password = password
        return next()
    }

    const accessToken = req.headers.authorization.split(" ")[1]

    const reset = jwt.verify(accessToken, reset_secret, {
        algorithms: ['HS256'],
    }, (err, decoded) => {
        if(!err)
            return true
        
        if(err.name === "TokenExpiredError")
            return res.status(410).send("This reset link has expired. Please submit a new request for a reset link.")
    })

    if(reset)
        return next()

    const { Fgp, RFgp } = req.cookies

    try {
        const { userID } = jwt.verify(accessToken, a_secret, {
            algorithms: ['HS256'],
            userFP: crypto.createHash('sha256').update(Buffer.from(Fgp, 'hex').toString()).digest('hex')
        })

        const user = await User.findOne({
            where: {
                id: userID
            },
        })

        if (!user)
            throw new Error("Server Error: User not Found");
    }
    catch (e) {
        if (e.name !== "TokenExpiredError")
            return res.status(401)
                .send({
                    message: "Error validating your session. Please login again."
                });

        const refreshedTokens = await genRefreshToken(accessToken, RFgp, a_secret, r_secret)

        if (_.isEmpty(refreshedTokens))
            return res.status(401).send("This session has expired. Please login again.");

        setTokenResponse(res, refreshedTokens)
    }
    next()
}


module.exports = {
    auth
}