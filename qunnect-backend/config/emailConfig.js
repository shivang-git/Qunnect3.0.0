import nodemailer from 'nodemailer';


export const sendEmail =async(data,req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      
    const info = await transporter.sendMail({
        from: '"Qunnect 👻" <foo@gmail.com>', // sender address
        to: data.to, // list of receivers
        subject: data.subject, // Subject line
        text: data.txt, // plain text body
        html: data.html // html body
        });
}