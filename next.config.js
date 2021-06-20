module.exports = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    api: {
        bodyParser: true,
    },
    env: {

        DB_LOCAL_URI: 'mongodb://localhost:27017/bookit',
        DB_DEV_URI: 'mongodb://localhost:27017/bookit',


        CLOUDINARY_CLOUD_NAME: 'grynd',
        CLOUDINARY_API_KEY: '499166171559223',
        CLOUDINARY_API_SECRET: '6OecFa4mnzTzS0i56fuBe_yOWQQ',


        SMTP_HOST: "smtp.mailtrap.io",
        SMTP_PORT: "2525",
        SMTP_USER: "e7fdd2438aa408",
        SMTP_PASSWORD: "8a25a5a626c0cc",
        SMTP_FROM_EMAIL: "accounts@thegrynd.com",
        SMTP_FROM_NAME: "THE GRYND",
        NEXTAUTH_URL: "",


        NEXTAUTH_URL: '',
    }
};