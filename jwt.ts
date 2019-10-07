import * as dotenv from "dotenv";


dotenv.config();
const jwt = {
    jwtSecret: process.env.JWT_SECRET,
    jwtSession: {
        session: false
    }
};

export default jwt;