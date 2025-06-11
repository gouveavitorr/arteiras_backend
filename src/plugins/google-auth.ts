import { FastifyInstance, fastify } from "fastify";
import passport from "@fastify/passport"
import secureSession from 'fastify-secure-session'
import fs from 'fs'
import path from 'path'
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth'

export const googleAuth = async (app: FastifyInstance) {
  
  app.register(secureSession, {
    key: fs.readFileSync(path.join(__dirname, 'secret-key')),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: true, //set to false to use with http://localhost
    }
  })
  
  app.register(passport.initialize())
  app.register(passport.secureSession())
  
  passport.use('googleAuth', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: ``},
    async (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
  }))

  passport.registerUserSerializer(async user => user)
  passport.registerUserDeserializer(async user => user)
}
