export interface CityWeatherDB {
    id: number,
    coord: string,
    weather: string,
    base: string,
    main: string,
    visibility: number,
    wind: string,
    rain: string,
    clouds: string,
    dt: number,
    sys: string,
    timezone: number,
    name: string,
    cod: number,
    created_at?: Date,
    updated_at?: Date
}

export interface CityWeather {
    id: number,
    coord: Coord, // jsonb
    weather: Array<Weather>, // jsonb
    base: string,
    main: Main, // jsonb
    visibility: number,
    wind: Wind, // jsonb
    rain: Rain, // jsonb
    clouds: Clouds, // jsonb
    dt: number,
    sys: Sys, // jsonb
    timezone: number,
    name: string,
    cod: number,
    created_at?: Date,
    updated_at?: Date
}

interface Coord {
    lon: number,
    lat: number
}

interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface Main {
    temp: number,
    pressure: number,
    humidity: number,
    temp_min: number,
    temp_max: number
}

interface Wind {
    speed: number,
    deg: number
}

interface Rain {
    "1h": number
}

interface Clouds {
    all: number
}

interface Sys {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
}