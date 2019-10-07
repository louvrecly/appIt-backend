import * as Knex from "knex";
import { User } from "./models";

export class UserService {

    constructor(private knex: Knex) { }

    getByUsername(username: string) {
        return this.knex.select('*').from("users").where("username", username).limit(1);
    }

    addUser(user: User) {
        return this.knex.insert(user).into('users').returning('id');
    }

}