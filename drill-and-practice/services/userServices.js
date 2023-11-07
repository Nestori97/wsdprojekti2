import { sql } from "../database/database.js";
const addUser = async (email, password) =>{
    await sql`INSERT INTO users 
    (email , password )
      VALUES ( ${email}, ${password})`;
}
const addRights = async(email)=> {
  await sql`UPDATE users SET admin = true Where email = ${email}`;
}
const findUserByEmail = async (email) => {
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  return rows;
};
export{addUser,addRights, findUserByEmail}