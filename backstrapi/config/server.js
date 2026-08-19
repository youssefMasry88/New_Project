module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://homey-strapi.onrender.com'),
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  app: {
    keys: env.array('APP_KEYS'),
  },
});