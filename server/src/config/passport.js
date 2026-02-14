import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        if (!email) {
          return done(new Error("No email found from Google"), null);
        }

        let user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name,
              provider: "google"
            }
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
