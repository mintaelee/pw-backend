const nodemailer = require('nodemailer')

module.exports = {
    sendEmail: (mail) => {
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: 'mintae0424@gmail.com',
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: process.env.ACCESS_TOKEN
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