import * as bcrypt from "bcrypt";


const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string) {
    const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hash;
}

export async function checkPassword(plainPassword: string, hashPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashPassword);
    return match;
}


// // hash seed passwords
// const run = async () => {
//     console.log("111 = ", await hashPassword("111"));
//     console.log("222 = ", await hashPassword("222"));
//     console.log("333 = ", await hashPassword("333"));
// };
// run();