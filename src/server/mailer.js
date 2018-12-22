const nodemailer = require('nodemailer')

const email = "torontoblizzardweb@gmail.com"

let transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: "torontoblizzardweb@gmail.com",
            pass: "Tblizzard"
        }
    }
)

module.exports = {
    transporter, 
    email
}