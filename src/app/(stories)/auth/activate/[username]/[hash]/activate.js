import { sql } from "lib/db";

async function check_username(username, existing) {
  let result =
    await sql`SELECT id, email FROM "user" WHERE LOWER(username) = LOWER(${username})`;

  if (existing) {
    if (result.length) {
      return result[0];
    }
    return { status: 403, message: "Error username does not exists" };
  } else {
    if (result.length) {
      return { status: 403, message: "Error username already exists" };
    }
    return true;
  }
}

export async function activate({ username, hash }) {
  // check username
  let username_check = await check_username(username, true);
  if (username_check?.status) return username_check;
  // activate the user
  await sql`UPDATE "user" SET activated = true WHERE username = ${username} AND activation_link = ${hash};`;

  // check if it was set correctly
  let result2 =
    await sql`SELECT activated FROM "user" WHERE username = ${username} AND activation_link = ${hash};`;

  if (result2[0].activated) return "done";
  return { status: 403, message: "Username or activation link do not exist." };
}
