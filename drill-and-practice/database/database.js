import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = new postgres({
    hostname: "flora.db.elephantsql.com",
    database: "omrybglp",
    user: "omrybglp",
    password: "s_6gSfu6Zud6nq9KBZHyyMUsf7cHXqxn",
    port: 5432,
    max: 2, // use at most 2 concurrent connections
  });
}

export { sql };
