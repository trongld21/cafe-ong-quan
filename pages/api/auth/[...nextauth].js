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

        const admin = {
          id: "21",
          email: "trongld21@gmail.com",
          password: "Default@123",
        };
        if (email !== admin.email || password !== admin.password) {
          // Authenticate with Firebase Auth
          const auth = getAuth();
          try {
            await signInWithEmailAndPassword(auth, email, password);
          } catch (error) {
            throw new Error("invalid credentials");
          }

          // Check Firebase Firestore for user state
          const usersCollection = collection(firestore, "employees");
          const querySnapshot = await getDocs(usersCollection);
          const users = querySnapshot.docs.map((doc) => doc.data());
          const user = users.find((user) => user.username === email);
          if (!user || !user.state) {
            throw new Error("user is not active");
          }

          return {
            id: user?.id,
            name: user?.fullName,
            email: user?.username,
            role: user?.role,
          };
        } else {
          return {
            id: "1234",
            name: "trongld",
            email: "trongld21@gmail.com",
            role: "Admin"
          };
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
};

export default NextAuth(authOptions);