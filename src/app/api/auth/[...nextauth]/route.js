import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "Password", type: "password" },
      },
       
      async authorize(credentials) {
        // Conectarse a la base de datos
        await connect();
        
        try {
          // Encuentra al usuario por el nombre de usuario
          const user = await User.findOne({ name: credentials.name });

          if (user) {
            // Verifica si la contraseña es correcta
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            // console.log(user);
            if (isPasswordCorrect) {
              //console.log(user);
              return user;
            } else {
              throw new Error("Credenciales incorrectas");
            }
          } else {
            throw new Error("Usuario no encontrado");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    error: "/dashboard/login",
  },
});

export { handler as GET, handler as POST };
