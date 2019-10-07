import * as passport from "passport";
import * as passportJWT from "passport-jwt";
import jwt from "./jwt";
import { userService } from "./app";


const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

passport.use(new JWTStrategy({
    secretOrKey: jwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    console.log("passport payload", payload)
    const [user] = await userService.getByUsername(payload.username);
    // const user = {
    //     username: payload.username
    // };
    if (user) {
        console.log("passport", { user });
        return done(null, user);
    } else {
        return done(new Error(`non-existent username: ${payload.username}`));
    }
}));