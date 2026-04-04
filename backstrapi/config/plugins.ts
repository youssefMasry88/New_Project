export default ({ env }) => ({
  email: {
    config: {
      provider: "@strapi/provider-email-nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: Number(env("SMTP_PORT")),
        secure: env("SMTP_SECURE") === "true", // false مع 587
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_FROM"),
        defaultReplyTo: env("SMTP_REPLY_TO"),
      },
    },
  },
});