import Mailgen from "mailgen"
import nodemailer, { Mail } from 'nodemailer'


const sendEmail = async(options)=>{
    const mailGenrator= new Mailgen({
       theme :"default",
       product :{
        name : "PROJECT_MANAGER",
        link : "http://projectmanagerlink.com"
       }
    });

    const emailSimpleText = mailGenrator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenrator.generate(options.mailgenContent)

      const transporter = nodemailer.transporter({
         service : "gmail",
         auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
            },
        })


        const mail ={
        from :"heyyyakash907@gmail.com",
        to:options.email,
        subject  : options.subject,
        text: emailSimpleText,
        html: emailHtml,
        }


        try{
            await transporter.sendEmail(mail)
        }catch(err){
            console.err("error while sending email verfication linke -> " , err)
            throw new ApiError(500 , "Verfication mail not send ..Please contact with a team")
           
            
        }

}




const emailVerficationMailgenContent = (username , verficationUrl)=>{
    return {
      body:{
        name : username,
        intro : "Welcome to our App! We\'re very excited to have you on board.",
        action: {
            instructions: 'To verify your email please click on following button:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: verficationUrl
            }},
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    }
}

const forgetPasswordMailgenContent = (username , passwordResetUrl)=>{
    return {
      body:{
        name : username,
        intro : "we got a request for reset your password",
        action: {
            instructions: 'To reset your password please click on following button:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: passwordResetUrl
            }},
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    }
}


export {emailVerficationMailgenContent , forgetPasswordMailgenContent ,sendEmail}