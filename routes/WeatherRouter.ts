import * as express from "express";
import { WeatherService } from "../services/WeatherService";
import { WeatherAPIService } from "../services/WeatherAPIService";
import { CityWeather, CityWeatherDB } from "../services/models";


export class WeatherRouter {

    constructor(private weatherService: WeatherService, private weatherAPIService: WeatherAPIService) { }

    public router() {
        const router = express.Router();
        router.get('/:city', this.get);
        return router;
    }

    get = async (req: express.Request, res: express.Response) => {
        try {
            const cityName = req.params.city.toLowerCase();
            const resp = await this.weatherAPIService.get(cityName);
            const result: CityWeather = await resp.json();
            if (result.cod === 200) {
                const cityWeatherDB: CityWeatherDB = {
                    ...result,
                    coord: JSON.stringify(result.coord),
                    weather: JSON.stringify(result.weather),
                    main: JSON.stringify(result.main),
                    rain: JSON.stringify(result.rain),
                    wind: JSON.stringify(result.wind),
                    clouds: JSON.stringify(result.clouds),
                    sys: JSON.stringify(result.sys),
                };
                const { name } = result;
                const [cityWeather] = await this.weatherService.get(name);
                if (cityWeather) {
                    await this.weatherService.put(cityWeatherDB);
                } else {
                    await this.weatherService.post(cityWeatherDB);
                }
                res.status(200).json({ isSuccess: true, cityWeather: result });
            } else {
                const [cityWeather] = await this.weatherService.get(cityName);
                if (cityWeather) {
                    res.status(200).json({ isSuccess: true, cityWeather });
                } else {
                    res.status(404).json({ isSuccess: false, msg: "city not found in database!" });
                }
            }
        } catch(err) {
            console.log(err.toString());
            res.status(500).json({ isSuccess: false, msg: err.toString() });
        }
    }

}