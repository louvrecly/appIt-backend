import * as Knex from "knex";
import { CityWeatherDB } from "./models";


export class WeatherService {

    constructor(private knex: Knex) { }

    get(name: string) {
        return this.knex.select('*').from("weather").where("name", 'ilike', name).orderBy('created_at', 'desc').limit(1);
    }

    post(cityWeatherDB: CityWeatherDB) {
        return this.knex.insert(cityWeatherDB).into("weather");
    }

    put(cityWeatherDB: CityWeatherDB) {
        const { id } = cityWeatherDB;
        return this.knex.update(cityWeatherDB).into("weather").where("id", id);
    }

}