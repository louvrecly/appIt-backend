import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("weather");
    if (!hasTable) {
        await knex.schema.createTable("weather", (table) => {
            table.increments();
            table.jsonb("coord");
            table.jsonb("weather");
            table.string("base");
            table.jsonb("main");
            table.integer("visibility");
            table.jsonb("wind");
            table.jsonb("rain");
            table.jsonb("clouds");
            table.integer("dt");
            table.jsonb("sys");
            table.integer("timezone");
            table.string("name");
            table.integer("cod");
            table.timestamps(false, true);
        });
        console.log(`Table "weather" has been created!`);
    } else {
        console.log(`Table "weather" already exists!`);
    }
    return;
}


export async function down(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("weather");
    if (hasTable) {
        await knex.schema.dropTableIfExists("weather");
        console.log(`Table "weather" has been dropped!`);
    } else {
        console.log(`Table "weather" does not exist!`);
    }
    return;
}