import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase"; // Đảm bảo đúng đường dẫn

const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        // Check Firebase Firestore for user state
        const usersCollection = collection(firestore, "employees");
        const querySnapshot = await getDocs(usersCollection);
        const users = querySnapshot.docs.map((doc) => doc.data());
        const user = users.find((user) => {
          return user.username === email;
        });

        if (user && user.password === password) {
          return user;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
