import { InfisicalClient } from "@infisical/sdk";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool;

export function getDb() {
  if (!pool) {
    // Try to get database URL from Infisical first
    const infisicalToken = process.env.INFISICAL_TOKEN;
    
    if (infisicalToken) {
      const client = new InfisicalClient({
        siteUrl: "https://app.infisical.com/api",
        token: infisicalToken,
      });

      const secrets = client.getSecrets({
        projectId: process.env.INFISICAL_PROJECT_ID!,
        environmentSlug: process.env.INFISICAL_ENVIRONMENT || "dev",
      });

      const databaseUrl = secrets.DATABASE_URL;
      
      pool = new Pool({
        connectionString: databaseUrl,
      });
    } else {
      // Fallback to environment variable
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL environment variable is not set");
      }

      pool = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
  }

  return drizzle(pool, { schema });
}

export const db = getDb();
