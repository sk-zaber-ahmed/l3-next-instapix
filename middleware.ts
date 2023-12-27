// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// export default NextAuth(authConfig).auth;

import { NextRequest, NextResponse } from "next/server";

async function middleware(request: NextRequest) {
  // console.log("call middleware", request);
  // const cookie = request.cookies.get(process.env.AUTH_SECRET as string);
  const access_token = request.cookies.get("access_token");
  const refresh_token = request.cookies.get("refresh_token");

  if (
    !access_token &&
    !refresh_token &&
    request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (refresh_token && request.nextUrl.pathname.startsWith("/login")) {
    if (access_token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      const res = await fetch("http://127.0.0.1:5000/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: refresh_token.value,
        }),
      });

      const user = await res.json();

      // const access_token = request.cookies.get("access_token");
      // console.log("for test===========================\n", user, access_token);

      const response = NextResponse.redirect(
        new URL("/dashboard", request.url)
      );

      response.cookies.set("access_token", user?.access_token, {
        path: "/",
        domain: "localhost",
        maxAge: user?.expires_in,
        httpOnly: true,
        secure: false,
      });

      return response;
    }
  }

  if (!access_token && refresh_token) {
    const res = await fetch("http://127.0.0.1:5000/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token.value,
      }),
    });

    const user = await res.json();

    // const access_token = request.cookies.get("access_token");
    // console.log("for test===========================\n", user, access_token);

    const response = NextResponse.next();

    response.cookies.set("access_token", user?.access_token, {
      path: "/",
      domain: "localhost",
      maxAge: user?.expires_in,
      httpOnly: true,
      secure: false,
    });

    return response;
  }

  return NextResponse.next();
}
export default middleware;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// async function middleware(request: NextRequest) {
//     const access_token = request.cookies.get("access_token");
//     const refresh_token = request.cookies.get("refresh_token");

//     if (!refresh_token && request.nextUrl.pathname.startsWith('/dashboard')) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     if (request.nextUrl.pathname.startsWith('/login') && !refresh_token) {
//         return NextResponse.next();
//     }
//     if (request.nextUrl.pathname.startsWith('/login') && refresh_token) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }

//     try {
//         if (access_token && refresh_token && request.nextUrl.pathname.startsWith('/dashboard')) {
//             if (access_token.value !== "") {
//                 return NextResponse.next();
//             }
//             console.log("===============================================");
//             console.log("middleware called", access_token, refresh_token);

//             const resData = await getAccessTokenWithRefreshToken(refresh_token?.value);

//             if (resData.access_token && resData.access_token !== "") {
//                 const response = NextResponse.redirect(new URL('/dashboard', request.url));

//                 response.cookies.set("access_token", resData?.access_token, {
//                     path: "/",
//                     domain: "localhost",
//                     maxAge: resData?.expires_in,
//                     httpOnly: true,
//                     secure: false,
//                 });
//                 return response;
//             }
//             throw new Error("access_token not found");
//         }

//         if (!access_token && refresh_token && request.nextUrl.pathname.startsWith('/dashboard')) {

//             const newResponse = await getAccessTokenWithRefreshToken(refresh_token?.value);

//             if (newResponse.access_token && newResponse.access_token !== "") {
//                 const response = NextResponse.redirect(new URL('/dashboard', request.url));

//                 response.cookies.set("access_token", newResponse?.access_token, {
//                     path: "/",
//                     domain: "localhost",
//                     maxAge: newResponse?.expires_in,
//                     httpOnly: true,
//                     secure: false,
//                 });
//                 return response;
//             }
//             throw new Error("access_token not found");
//         }

//     } catch (error) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
// }
// export default middleware;

// async function middleware(request: NextRequest) {
//     const access_token = request.cookies.get("access_token");
//     const refresh_token = request.cookies.get("refresh_token");

//     if (!refresh_token && request.nextUrl.pathname.startsWith('/dashboard')) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     if (request.nextUrl.pathname.startsWith('/login') && !refresh_token) {
//         return NextResponse.next();
//     }
//     if (request.nextUrl.pathname.startsWith('/login') && refresh_token) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }

//     try {
//         if (access_token && refresh_token && request.nextUrl.pathname.startsWith('/dashboard')) {
//             if (access_token.value !== "") {
//                 return NextResponse.next();
//             }
//             console.log("===============================================");
//             console.log("middleware called", access_token, refresh_token);

//             const resData = await getAccessTokenWithRefreshToken(refresh_token?.value);

//             if (resData.access_token && resData.access_token !== "") {
//                 const response = NextResponse.redirect(new URL('/dashboard', request.url));

//                 response.cookies.set("access_token", resData?.access_token, {
//                     path: "/",
//                     domain: "localhost",
//                     maxAge: resData?.expires_in,
//                     httpOnly: true,
//                     secure: false,
//                 });
//                 return response;
//             }
//             throw new Error("access_token not found");
//         }

//         if (!access_token && refresh_token && request.nextUrl.pathname.startsWith('/dashboard')) {

//             const newResponse = await getAccessTokenWithRefreshToken(refresh_token?.value);

//             if (newResponse.access_token && newResponse.access_token !== "") {
//                 const response = NextResponse.redirect(new URL('/dashboard', request.url));

//                 response.cookies.set("access_token", newResponse?.access_token, {
//                     path: "/",
//                     domain: "localhost",
//                     maxAge: newResponse?.expires_in,
//                     httpOnly: true,
//                     secure: false,
//                 });
//                 return response;
//             }
//             throw new Error("access_token not found");
//         }

//     } catch (error) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
// }
// export default middleware;
