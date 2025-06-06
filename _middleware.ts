import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks:{
    // async authorized(param) {
    //   console.log('middleware token', param.)
    //   return !!param.token // If there is a token, the user is authenticated
    // }
  },
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/signIn",
    // error: "/error",
  },
})
export const config = { matcher: [
  "/admin/:path*",
  "/",
  // "/classes/:path*",
] }
