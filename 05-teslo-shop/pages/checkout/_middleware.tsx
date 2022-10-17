import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { token = "" } = req.cookies;

  /* esto es nativo de js */
  // return new Response('No autorizado', {
  //   status: 401
  // })

  try {
    await jwt.isValidToken(token);
    /* como de node/express */
    /* si es válido pasamos a la siguiente página */
    return NextResponse.next();
  } catch (error) {
    const requestedPage = req.page.name;
    return NextResponse.redirect(`/auth/login?p=${requestedPage}`);
  }
}
