import {neon, neonConfig} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http'
neonConfig.fetchConnectionCache = true

if(!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set')
}

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql)
//This db variable is used to interact with the database to call queries and mutations
//We need a schema for this as it defines the shape of the database