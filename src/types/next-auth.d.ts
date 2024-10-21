import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name?: string; // Add any additional properties you want
      // You can add more properties as needed
    };
  }
}
