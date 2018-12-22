
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const argon2 = require('argon2')
const { User } = require('./sequelize')

const config = {
    jwtSecret: "VERKEY",
    jwtSession: {
        session: false //b/c using jwt
    }
}

let opts = {}

const extractFromUrl = (req) => {
    console.log(req.query["id"])
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNTQ0OTc5MDIwfQ._JoKmX0ZuQP5B2ntB9QNcYUwY7Shc1mFHTddNgal58c"
    return token
}

opts.jwtFromRequest = extractFromUrl
opts.secretOrKey = config.jwtSecret

passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
        User.findOne({
            where: {
                email: jwt_payload.user.id.email
            }
        }).then(user => {
            if(user) {
                console.log("USER FOUND")
                return done(null, user)
            }
            else {
                console.log("NO USER")
                return done(null, false)
            }
        }).catch(err => done(err))
    })
)

module.exports = {
    passport
}