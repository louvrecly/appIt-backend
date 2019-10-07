import * as Knex from "knex";


export class UserService {

    constructor(private knex: Knex) { }

    getByUsername(username: string) {
        return this.knex.select('*').from("users").where("username", username).limit(1);
    }
    
}