import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'siggmaalimiteds@gmail.com',
        pass: 'ltlbykvtgfryrqav'
    }
});

export const sendEmail = async ({email, subject, payload}: any) =>{

    
   try {
        const mailOptions = {
            from: 'siggmaalimiteds@gmail.com',
            to: email,
            subject: subject,
            text: payload
        };


        const info = await transporter.sendMail(mailOptions);

        
        console.log('Email has been send: ' + info.response);

        return info.response
    } catch (error) {
        console.log('Error in sending email: ' + error);
    }


}


