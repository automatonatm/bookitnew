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


        SMTP_HOST: "",
        SMTP_PORT: "",
        SMTP_USER: "",
        SMTP_PASSWORD: "",
        SMTP_FROM_EMAIL: "",
        SMTP_FROM_NAME: "",


        NEXTAUTH_URL: '',
    }
};