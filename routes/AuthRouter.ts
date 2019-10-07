import * as express from "express";
import * as jwtSimple from "jwt-simple";
import jwt from "../jwt";
import { UserService } from "../services/UserService";
import { checkPassword, hashPassword } from "../hash";


export class AuthRouter {
    
    constructor(private userService: UserService) { }

    public router() {
        const router = express.Router();
        router.post('/login', this.login);
        router.post('/register', this.register);
        return router;
    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                console.log("Missing username or password!");
                res.status(401).json({ isSuccess: false, msg: "Missing username or password!" });
            } else {
                const [user] = await this.userService.getByUsername(username);
                if (!user) {
                    console.log("Incorrect username!");
                    res.status(401).json({ isSuccess: false, msg: "Incorrect username or password!" });
                } else {
                    const match = await checkPassword(password, user.password);
                    if (!match) {
                        console.log("Incorrect password!");
                        res.status(401).json({ isSuccess: false, msg: "Incorrect username or password!" });
                    } else {
                        const payload = {
                            id: user.id,
                            username: user.username
                        };
                        console.log("payload", payload)
                        const token = jwtSimple.encode(payload, jwt.jwtSecret!);
                        console.log("User authenticated!", token);
                        res.json({ token });
                    }
                }
            }
        } catch (err) {
            console.log(err.toString());
            res.status(500).json({ isSuccess: false, msg: err.toString() });
        }
    }

    register = async (req: express.Request, res: express.Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            console.log("Missing username or password!");
            res.status(401).json({ isSuccess: false, msg: "Missing username or password!" });
        } else {
            const [user] = await this.userService.getByUsername(username);
            if (user) {
                console.log("Username already taken!");
                res.status(401).json({ isSuccess: false, msg: "Username already taken!" });
            } else {
                const hash = await hashPassword(password);
                const newUser = {
                    username,
                    password: hash
                };
                const id = await this.userService.addUser(newUser);
                res.json({ isSuccess: true, data: id, msg: "Account registered! Please sign in!" });
            }
        }
    }

}