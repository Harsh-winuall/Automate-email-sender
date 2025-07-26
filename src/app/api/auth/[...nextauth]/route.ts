// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { findUserByEmail } from "@/lib/userService";

// ✅ Export authOptions separately
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await findUserByEmail(credentials.email);
        if (user && (await compare(credentials.password, user.password))) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
};

// ✅ Pass it into NextAuth()
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
