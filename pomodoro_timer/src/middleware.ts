import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/", "/home", "/((?!.*\\.[\\w]+$|_next).*)"], // Match all routes except those with file extensions and Next.js internal routes
};
