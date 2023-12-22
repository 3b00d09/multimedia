import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {DATABASE_URL} from "$env/static/private"
import * as schema from "$lib/server/schema"
 
const connectionString = DATABASE_URL
const supabaseClient = postgres(connectionString)
export const dbClient = drizzle(supabaseClient, {schema: schema});