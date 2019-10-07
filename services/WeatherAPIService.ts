import fetch from "node-fetch";


export class WeatherAPIService {

    get = async (cityName: string) => {
        const { APP_ID } = process.env;
        return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APP_ID}`);
    }

}