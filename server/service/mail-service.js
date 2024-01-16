const nodemailer = require("nodemailer")

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "xmdnssx@gmail.com",
                pass: "set password here"
            }
        })
    }

    async sendActivationMail (to, link) {
        await this.transporter.sendMail({
            from: "xmdnssx@gmail.com",
            to,
            subject: "Activation for " + process.env.API_URL,
            text: "",
            html: `
                <div>
                    <h1>Click the link to activate account</h1>
                    <a href="${link}">${link}</a>
                </div> 
            `
        })
    }
}

module.exports = new MailService()