const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

module.exports = {
    sendEmail: async (mail) => {
        return new Promise(async (resolve, reject) => {
            const oauth2Client = new OAuth2(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                "https://developers.google.com/oauthplayground"
            )
            oauth2Client.setCredentials({
                refresh_token: process.env.REFRESH_TOKEN,
            })

            const accessToken = await new Promise((resolve, reject) => {
                oauth2Client.getAccessToken((err, token) => {
                    if (err) {
                        console.log(err)
                        reject()
                    }
                    resolve(token)
                })
            })
            let transporter = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: 'mintae0424@gmail.com',
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                }
            })

            transporter.verify((error, success) => {
                if(error){
                    console.log(error)
                } else {
                    console.log('Server is ready')
                }
            })

            transporter.sendMail(mail, (err, data) => {
                if(err){
                    reject('fail')
                    
                } else {
                    resolve('success')
                }
            })
        })
    }
}