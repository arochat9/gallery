// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";

// import { env } from "~/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: postgres.Sql | undefined;
// };

// const conn = globalForDb.conn ?? postgres(env.POSTGRES_URL);
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema });

// src/db.ts
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config, type DotenvConfigOutput } from "dotenv";
import path from "path";
import * as schema from "./schema";

// config({ path: path.join(__dirname, "../../.env") });

config({ path: ".env" }); // or .env.local

const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql, { schema });
