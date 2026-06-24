import repository from './repository';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const {handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {type: 'email'},
        password: {type: 'password'},
        name: {type: 'text'}
      },
      authorize: async (credentials) => {
        let user = null;

        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) {
          throw new Error('Email and password are required.');
        }
        // logic to verify if the user exists
        user = await repository.auth.postLogin({
          email,
          password
        });

        if (!user || !user.data || !user.data.user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error('Invalid credentials.');
        }

        // return user object with their profile data
        return user.data.user;
      }
    })
  ],
  secret: process.env.AUTH_SECRET
});
