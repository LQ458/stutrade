import DBconnect from "../../../../libs/mongodb";
import User from "../../../../models/user";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await DBconnect;
        const email = credentials?.email || '';
        const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
        const passwordCorrect = await bcrypt.compare(
          credentials?.password || '',
          user.password
        );

        if (passwordCorrect) {
          return {
            id: user._id,
            user
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };