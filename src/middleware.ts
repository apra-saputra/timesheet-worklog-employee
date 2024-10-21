// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/extra", "/dashboard"] };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "@/lib/access";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

// console.log(matchers);

export default clerkMiddleware((auth, req) => {
  // if (isProtectedRoute(req)) auth().protect()

  // const { sessionClaims } = auth();

  // console.log({sessionClaims});

  // const role = (sessionClaims?.metadata as { role?: string })?.role;

  // for (const { matcher, allowedRoles } of matchers) {
    // console.log(rol);
    // if (matcher(req) && !allowedRoles.includes(role!)) {
    //   return NextResponse.redirect(new URL(`/${role}`, req.url));
    // }
    
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
