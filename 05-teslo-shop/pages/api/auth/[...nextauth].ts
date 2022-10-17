/* cualquier url que venga dentro de aqui pasa por aquí */

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {label: 'Correo', type: 'email', placeholder: 'correo@google.com'},
        password: {label: 'Contraseña', type: 'password', placeholder: 'Contraseña'},
      },
      async authorize(credentials) {
        return null
      }
    })
  ],

  /* callbacks */
  /* por defecto es wjt */
  callbacks: {
    
  }
};
export default NextAuth(authOptions);
