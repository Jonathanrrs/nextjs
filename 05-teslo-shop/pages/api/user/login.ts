import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "../../../database";
import { User } from "../../../models";

type Data = 
| { message: string;}
| { 
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      res.status(400).json({
        message: "Bad request",
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  /* ya viene parseado la info gracias a next */

  const { email = "", password = "" } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  db.disconnect();

  if (!user) {
    return res.status(400).json({
      message: "Correo o contraseña no válidos - Email",
    });
  }

  /* si no son iguales las contraseñas encriptadas */
  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({
      message: "Correo o contraseña no válidos - Password",
    });
  }

  const { role, name } = user;

  return res.status(200).json({
    token: "", /* jwt */
    user: {
      email,
      role,
      name,
    },
  });
};
