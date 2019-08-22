var express = require('express');
var router = express.Router();

let contactController = require('./controllers/contactController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/contact', function(req, res,next){
    let name = req.body.user_name
    let email = req.body.user_email
    let contact = req.body.contact
    let content = `Name: ${name} \n Email: ${email} \n message: ${contact}`

    let mail = {
        from: name,
        to: 'mintae0424@gmail.com',
        subject: 'New Message from Contact Form',
        text: content
    }

    contactController.sendEmail(mail)
        .then(result => {
            res.json(result)
        })
        .catch( error => {
            res.json(error)
        })
})

module.exports = router;
