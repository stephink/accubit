const { User, Log } = require('../model/index.js')
const csv = require('csv-parser')
const fs = require('fs')
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = require('../config/env.config');

exports.sendingEmail = async (req, res) => {
    try {
        //checking file is passed thought the request
        if (!req.file) {
            return res.send({
                "message": "request doesnot contain CSV file"
            })
        }
        //sending reuest file to convert csv to json format
        const csvData = await csvtojson(req.file.path)
        User.findOne({ email: csvData.email }).then(async user => {
            if (!user) {
                res.send({
                    status: false,
                    message: "Failed! user not exist!"
                });
                return;
            }
            const emailData = {
                to: user.email,
                subject: csvData.name,
                content: csvData.content + " sended for " + user.firstname + " " + user.lastname
            }
            //calling function for sending mail
            const sendingMail = await sendgridEmailSending(emailData)
            if (sendingMail.status === "failed") {
                return res.status(400)
            }
            const newLog = new Log({
                email: user.email,
                letterName: csvData.name
            })
            //saving the data in the log table
            newLog.save().then(() => {
                return res.send({
                    "message": "Email is sended"
                })
            }).catch(err => {
                return res.status(400)
            })
        }).catch((err) => {
            return res.status(400)
        })

    } catch (e) {
        return res.status(400)
    }
}
// function for convertion of csv file to json
const csvtojson = (path) => {
    return new Promise((resolve, reject) => {
        try {
            //converting csv File to json
            const results = []
            fs.createReadStream(path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    console.log(results)
                    resolve(results[0])
                });
        } catch (e) {
            reject(results)
        }
    })
}
//function for enamil sending 
const sendgridEmailSending = (emailData) => {
    return new Promise(async (resolve, reject) => {
        sgMail.setApiKey(SENDGRID_API_KEY);
        const message = {
            to: emailData.to,
            from: SENDGRID_FROM_EMAIL,
            subject: emailData.subject,
            text: emailData.content,
        }
        const response = await sgMail.send(message).catch(err => {
            reject({
                "status": "failed"
            })
        });
        if (response)
            resolve({
                "status": "sucess"
            })
    })
}