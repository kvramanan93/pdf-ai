import {defineConfig} from "drizzle-kit"
import * as dotenv from "dotenv";

dotenv.config({path:'F:\pdf-ai\.env'})

console.log("Database URL:", process.env.DATABASE_URL);

export default defineConfig({
    schema: "./src/lib/db/schema.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});