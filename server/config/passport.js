import pkg from 'passport-jwt';
import User from '../models/User.js';
import * as dotenv from "dotenv";

const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

dotenv.config();

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findById(jwt_payload._id, function(err, user) {
            if (err) {
                // err means error and false means  no user
                return done(err, false);
            }
            if (user) {
                // null means no error and user means there is a user
                return done(null, user);
            } else {
                // here, no error but no user
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}
