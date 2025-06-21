import { prisma } from "../lib/prisma"
import { Profile as GoogleProfile } from "passport-google-oauth"

export async function handleGoogleLogin(profile: GoogleProfile) {
  const googleId = profile.id
  const email = profile.emails?.[0]?.value
  const name = profile.displayName

  if (!email) throw new Error("Google account has no email")

  let user = await prisma.user.findUnique({
    where: { googleId },
  })

  if (!user) {
    user = await prisma.user.findUnique({ where: { email } })
  }

  if (user) {
    if (!user.googleId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      })
    }
    return user
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      googleId,
      avatarUrl: profile.photos?.[0]?.value ?? null,
    },
  })

  return newUser
}
