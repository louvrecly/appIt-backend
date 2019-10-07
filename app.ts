import * as express from "express";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as Knex from "knex";
import * as moment from "moment";
import { UserService } from "./services/UserService";
import { WeatherService } from "./services/WeatherService";
import { WeatherAPIService } from "./services/WeatherAPIService";
import { AuthRouter } from "./routes/AuthRouter";
import { WeatherRouter } from "./routes/WeatherRouter";
import { isLoggedIn } from "./guards";
import "./passport";


const app = express();
const PORT = 8000;
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);

export const userService = new UserService(knex);
const weatherService = new WeatherService(knex);
const weatherAPIService = new WeatherAPIService();

const authRouter = new AuthRouter(userService);
const weatherRouter = new WeatherRouter(weatherService, weatherAPIService);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("[" + moment().format("YYYY-MM-DD HH:mm:ss") + "] " + req.method + ": " + req.path + " (" + req.user + ")");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter.router());
app.use('/weather', isLoggedIn, weatherRouter.router());

app.listen(PORT, () => console.log(`Listening to http://localhost:${PORT}...`));