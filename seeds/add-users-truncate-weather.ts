import * as Knex from "knex";


export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex("weather").del();

    // Deletes ALL existing entries
    await knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex.insert([
                { username: "user1", password: "$2b$10$G9vwK.Bgnd7oHZNn7bAVdOIP1s.oUlJvruidaBC1v4ZDywFKxhIey" },
                { username: "user2", password: "$2b$10$/uUvJ.HC5au1ChwuvsMb4uSR2YP5tb/nvvvsmeC3Zz0uOTQEcVpc2" },
                { username: "user3", password: "$2b$10$IimePoxHQ9QkcbWBFT7kIuncnjaorsk5xzi3HhFWhCBqzj81UccyO" }
            ]).into("users");
        });
};
