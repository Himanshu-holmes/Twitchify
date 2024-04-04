import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
  const hashedToken = await bcryptjs.hash(userId.toString(),10)
// TODO: configure mail for usage
if(emailType === "VERIFY"){
  await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000})
}else if(emailType === "RESET"){
  await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000})
}
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "021729b7b48456",
    pass: "d808173f767c68"
  }
});

    const mailOptions = {
      from: "heeman@hee.ai", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "verify your email" : "Reset your password", // Subject line
      // plain text body
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ?
    "VERIFY YOUR EMAIL":"RESET YOUR PASSWORD"}
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    or copy and paste the link below in your browser
    <br/>
    </p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
  } catch (error:any) {
    throw new Error(error.message)
  }
};
