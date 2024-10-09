import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { Adapter } from "next-auth/adapters"
import { authConfig } from "@/lib/auth"

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }