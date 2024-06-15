import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "feeling" &&
          credentials.password === "feeling"
        ) {
          return {
            name: "New feeling",
            email: "test@example.com",
          };
        } else if (
          credentials.username === "emotion" &&
          credentials.password === "emotion"
        ) {
          return {
            name: "emotion lover",
            email: "emotion@example.com",
          };
        } else {
          return null;
        }
      },
    }),
  ],
};

/* export const authOptions = {
  providers: [
    process.env.VERCEL_ENV === "preview"
      ? CredentialsProvider({
          name: "credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "username",
            },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (
              credentials.username === "feeling" &&
              credentials.password === "feeling"
            ) {
              return {
                name: "New feeling",
                email: "test@example.com",
              };
            } else {
              return null;
            }
          },
        })
      : GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }),
  ],
}; */

export default NextAuth(authOptions);
