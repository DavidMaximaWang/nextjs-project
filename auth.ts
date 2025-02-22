import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
//   callbacks: {
//     async signIn({user, account, profile}) {
//         const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY);
//         console.log(user, account, profile)
//         if (!existingUser) {
//             await writeClient.create({
//                 _type: "author",
//                 id: profile?.id,
//                 name: user?.name,
//                 username: profile?.login,
//                 email: user?.email,
//                 image: user?.image,
//                 bio: profile?.bio || "",
//             })
//         }
//         return true;
//     },
//     async jwt({ token, account, profile }) {
//         // Add profile id to the JWT token on sign-in
//         if (account && profile) {
//           // get the user from sanity
//           const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//             id: profile?.id,
//           });

//           // Extend the token with the GitHub profile id
//           token.id = user._id;
//         }
//         return token;
//       },

//       async session({ session, token }) {
//         // Pass the profile id from the token to the session
//         Object.assign(session, { id: token.id });
//         return session;
//       },
//   }
})