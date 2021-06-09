import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import User from '../../../models/User'

import dbConnect from '../../../config/dbConnect'



export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                dbConnect();
                const {email, password} = credentials;

                //check id email or password
                if(!email || !password) {
                    throw new Error('Please Fill all form fields')
                }
                //Find User
                const user = await User.find({email}).select('+password');

                if(!user) {
                    throw new Error('Invalid Credentials')
                }

                //check if password matches
                const isMatch = await user.matchPassword(password);

                if(!isMatch) {
                    throw new Error('Invalid Credentials')
                }

                return Promise.resolve(user)

            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
             user && (token.user = user) ;
            return Promise.resolve(token)
        },
        session: async (session, user)  => {
            session.user  = user.user;

            return  Promise.resolve(session)
        }
    }
})