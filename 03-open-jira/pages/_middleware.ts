import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  /* para poder seguir pasando a la siguiente página, esto propio de un middlware */
  /* se ejecuta del lado del servidor */
  return NextResponse.next();

  // return new Response("Access denied", {
  //   status: 401,
  //   headers: {
  //     "x-token": "no existe",
  //   },
  // });
}
