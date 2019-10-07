**Weather API**
----
  This weather API is created to fetch weather data of a city from the OpenWeatherMap API and get the data stored in a database. 
  The data stored in the database will be returned if the OpenWeatherMap API is not available.

* **URL**

  /weather/:city <br />
  
* **Method:**

  `GET`
  
*  **URL Params**

    **Required:**
 
    `city=[string]`

* **Data Params**

    None

*  **Authorization**

    All API requests require the use of a JWT bearer token. You can get the bearer token by posting the route `/auth/login` with the following request body: 
    ```
    {
        "username": "user1",
        "password": "111"
    }
    ```
    And you should be able to get the bearer token for authentication. 
    
    Alternatively, you can also generate a new bearer token by posting the route `/auth/register` with the request body in the below format: 
    ```
    {
        "username": [YOUR_USERNAME],
        "password": [YOUR_PASSWORD]
    }
    ```
    Then you can get the bearer token by posting the route `/auth/login` with the same request body. 

    To authenticate an API request, you should add your bearer token into the request headers as follows: 
    ```
    {
        "Authorization": "Bearer [YOUR_BEARER_TOKEN]",
    }
    ```

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    {
        "isSuccess": true,
        "cityWeather": {
            "coord": {
                "lon": 114.16,
                "lat": 22.28
            },
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 301.07,
                "pressure": 1016,
                "humidity": 74,
                "temp_min": 299.82,
                "temp_max": 302.04
            },
            "visibility": 10000,
            "wind": {
                "speed": 3.6,
                "deg": 80
            },
            "clouds": {
                "all": 20
            },
            "dt": 1570457348,
            "sys": {
                "type": 1,
                "id": 9154,
                "message": 0.006,
                "country": "CN",
                "sunrise": 1570400179,
                "sunset": 1570442773
            },
            "timezone": 28800,
            "id": 1819729,
            "name": "Hong Kong",
            "cod": 200
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`
    
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```
    {
        "isSuccess": false,
        "msg": "city not found in database!"
    }
    ```

* **Sample Call:**

    ```
    const res = await fetch({
        "/weather/hong kong", {
        method: "GET"
    });
    const result = await res.json();
    console.log({ result });
    ```
    
* **Notes:**

    To access the OpenWeatherAPI, all requests require the use of an APP_ID key generated by OpenWeatherMap itself. You can get a APP_ID key by registering a free account on [https://openweathermap.org/api](https://openweathermap.org/api).

    To add your APP_ID into an API request, you should create a `.env` file with the following contents: <br />
    `APP_ID=[YOUR_APP_ID]` <br />
    
    To access the database, you should first create a database in the PostgreSQL server. <br />
    `CREATE DATABASE [YOUR_DB_NAME];` <br />
    And run the following command to migrate your database into the latest version. <br />
    `yarn knex migrate:latest` <br />
    Then you can initialize the data by running the seed file. <br />
    `yarn knex seed:run` <br />
    Remember to add your database name, username and password for accessing the postgres server into the `.env` file in the following format: <br />
    ```
    DB_NAME=[YOUR_DB_NAME]
    DB_USERNAME=[YOUR_DB_USERNAME]
    DB_PASSWORD=[YOUR_DB_PASSWORD]
    JWT_SECRET=[ADD_A_JWT_SECRET]
    APP_ID=[YOUR_APP_ID]
    ```