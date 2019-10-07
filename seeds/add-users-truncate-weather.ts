import * as Knex from "knex";


export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    await knex("weather").del();

    // Deletes ALL existing entries
    await knex("users").del()
        .then(() => {
            // Inserts seed entries
            return knex.insert([
                { username: "user1", password: "111" },
                { username: "user2", password: "222" },
                { username: "user3", password: "333" }
            ]).into("users");
        });
};
