import { FastifyRequest, FastifyReply } from "fastify"
import { Profile } from "passport-google-oauth"

export async function googleAuthController(
  req: FastifyRequest & { user?: Profile },
  reply: FastifyReply
) {
  try {
    const user = req.user

    if (!user) {
      return reply.status(401).send({ error: "Login failed" })
    }

    return reply.redirect("/")
  } catch (err) {
    return reply.status(500).send({ error: "Internal server error" })
  }
}
