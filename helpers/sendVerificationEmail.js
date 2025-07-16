import nodemailer from "nodemailer";

const {
  UKR_NET_EMAIL_HOST,
  UKR_NET_EMAIL_PASSWORD,
  UKR_NET_EMAIL_PORT,
  UKR_NET_EMAIL_USER,
} = process.env;

const nodemailerConfig = {
  host: UKR_NET_EMAIL_HOST,
  port: Number(UKR_NET_EMAIL_PORT),
  secure: true,
  auth: {
    user: UKR_NET_EMAIL_USER,
    pass: UKR_NET_EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendVerificationEmail = (payload) => {
  const email = { ...payload, from: UKR_NET_EMAIL_USER };

  return transport.sendMail(email);
};

export default sendVerificationEmail;
