const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

let email = "torontoblizzardweb@gmail.com"

//put mailer stuff in env
let transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: "torontoblizzardweb@gmail.com",
            pass: "Mapleleafs61"
        }
    }
)

const sendResetLink = async (name, url, res) => {
    return ejs.renderFile(__dirname.concat(path.sep + "emails" + path.sep + "reset.ejs"), {name: name, link: url}, (err, data) => {
        if(err) {
            return res.status(500).send({
                message: "There was an error sending the reset link email. Please send an email to torontoblizzardweb@gmail.com with \"PASS ERROR\" in the subject."
            });
        }

        let mainOptions = {
            from: '"Toronto Blizzard Web" torontoblizzardweb@gmail.com',
            to: "nickdangelo61@gmail.com",
            subject: 'Reset Link For the Toronto Blizzard',
            html: data
        };
    
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                return res.status(500).send({
                    message: "There was an error sending the reset link email. Please send an email to torontoblizzardweb@gmail.com with \"PASS ERROR\" in the subject."
                });
            } 

            return res.status(200).send()
        });
    
    }) 
}



module.exports = {
    transporter,    
    email,
    sendResetLink
}