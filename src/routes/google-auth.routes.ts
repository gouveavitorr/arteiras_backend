import { FastifyPluginAsync } from "fastify"
import passport from "@fastify/passport"
import { googleAuthController } from "../controllers/google-auth.controller"

const authRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  )

  app.get(
    "/auth/google/callback",
    {
      preValidation: passport.authenticate("google", {
        failureRedirect: "/login",
      }),
    },
    googleAuthController // this just redirects or sends a response
  )

  app.get("/auth/logout", async (req, reply) => {
    await req.logout()
    reply.redirect("/")
  })
}

export default authRoutes
