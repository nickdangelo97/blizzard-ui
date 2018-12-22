// import config from "./config";


const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
        session: false //b/c using jwt
    }
}

let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecret

passport.use(
    'jwt',
    new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
    })
)