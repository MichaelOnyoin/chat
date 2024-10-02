import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


const client = postgres('postgres://default:UySgz0Q3maNH@ep-ancient-morning-a4pxjxf0.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require');
export const db = drizzle(client);