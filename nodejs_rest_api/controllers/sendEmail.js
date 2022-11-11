import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
dotenv.config();
const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = async (to, username, url, txt) => {
  try {
    oauth2Client.setCredentials({
      refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });

    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_EMAIL_ADDRESS,
        clientId: MAILING_SERVICE_CLIENT_ID,
        clientSecret: MAILING_SERVICE_CLIENT_SECRET,
        refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: to,
      subject: "T_Network",
      html: `
                <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Hi, ${username}!</h2>
                <p>>Welcome to the T_Network.
                    I'am excited to have you get started. 
                    First, you need to verify your email address. 
                    Just press the button below.
                </p>
                
                <a href=${url} style="align-items: center; background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

                <p>If you have any questions, just reply to this email—I'm always happy to help out.</p>
                <span>
                    Cheers,
                    T_Network
                </span>
                </div>
            `,
    };

    const result = await smtpTransport.sendMail(mailOptions);
    return result;
  } catch (err) {
    return err;
  }
};

export default sendEmail;
