import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import User from "@/models/userSchema"



const sendmail = async ({email,emailType,userId}:any)=>{
    try {
        
        // create a hashed token 
        const mailTrapHost = process.env.MAIL_TRAP_HOST;
        const mailTrapPort = process.env.MAIL_TRAP_PORT;
        const mailTrapUser = process.env.MAIL_TRAP_USER;
        const mailTrapPassword = process.env.MAIL_TRAP_PASSWORD;
        if(!mailTrapHost || !mailTrapPort || !mailTrapUser || !mailTrapPassword){
            throw new Error("Missing mailtrap environment varibles");
        }

        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}
            )
        } 

        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}
            )
        }

       
        var transport = nodemailer.createTransport({
            host: process.env.MAIL_TRAP_HOST,
            port: parseInt(mailTrapPort, 10),
            auth: {
            user:mailTrapUser,
            pass:mailTrapPassword
            }
        });

        const mailOptions = {
            from:"bajwaSolz@gmail.com",
            to:email,
            subject:emailType === "VERIFY" ? "Verify Your Email":"Reset Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
           
        }

        const mailresponse = await transport.sendMail(mailOptions)
        return mailresponse


    } catch (error:any) {
        throw new Error(error.message)
    }
}


export {sendmail}