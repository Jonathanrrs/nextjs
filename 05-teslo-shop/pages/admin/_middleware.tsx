import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { jwt } from "../../utils";

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
  /* Ya no es necesario porque tenemos NextAuth */
  // const { token = "" } = req.cookies;

  // /* esto es nativo de js */
  // // return new Response('No autorizado', {
  // //   status: 401
  // // })

  // try {
  //   await jwt.isValidToken(token);
  //   /* como de node/express */
  //   /* si es válido pasamos a la siguiente página */
  //   return NextResponse.next();
  // } catch (error) {
  //   const requestedPage = req.page.name;
  //   return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  // }

  /* porque no se puede poner generico el gettoken */
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    const requestedPage = req.page.name;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login?p${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRoles = ["admin", "super-user", "SEO"];

  if (!validRoles.includes(session.user.role)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
