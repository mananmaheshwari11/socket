import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
export const sendEmail=async(reciever,title,host,joinCode,meetUrl)=>{
    try {
        const transporter=nodemailer.createTransport({
            port:25,
            service:'gmail',
            auth:{
                user:process.env.sender,
                pass:process.env.password
            }
        })
        await transporter.sendMail({
            from:process.env.sender,
            to:reciever,
            subject:"Invitation to join the Meet",
            text:`Dear user, ${host} is invited you to join the meet. 
            The title of the meet is '${title}'. 
            You can join the meet by the join code ${joinCode}, 
            or by clicking <a href="${meetUrl}">this link</a>`
        })
        return true
    } catch (error) {
        return false
    }
}