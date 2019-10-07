import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("users");
    if (!hasTable) {
        await knex.schema.createTable("users", (table) => {
            table.increments();
            table.string("username");
            table.string("password");
            table.timestamps(false, true);
        });
        console.log(`Table "users" has been created!`);
    } else {
        console.log(`Table "users" already exists!`);
    }
    return;
}


export async function down(knex: Knex): Promise<any> {
    const hasTable = await knex.schema.hasTable("users");
    if (hasTable) {
        await knex.schema.dropTable("users");
        console.log(`Table "users" has been dropped!`);
    } else {
        console.log(`Table "users" does not exist!`);
    }
    return;
}

