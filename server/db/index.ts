import { InfisicalClient } from "@infisical/sdk";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool;

async function getDatabaseUrl(): Promise<string> {
  // Try to get from Infisical first
  const infisicalToken = process.env.INFISICAL_TOKEN;
  const infisicalProjectId = process.env.INFISICAL_PROJECT_ID;
  const infisicalEnvironment = process.env.INFISICAL_ENVIRONMENT || "dev";

  if (infisicalToken && infisicalProjectId) {
    try {
      const client = new InfisicalClient({
        siteUrl: "https://app.infisical.com/api",
        token: infisicalToken,
      });

      const secrets = await client.getSecrets({
        projectId: infisicalProjectId,
        environmentSlug: infisicalEnvironment,
      });

      if (secrets.DATABASE_URL?.secretValue) {
        return secrets.DATABASE_URL.secretValue;
      }
    } catch (error) {
      console.error("Failed to fetch secrets from Infisical:", error);
    }
  }

  // Fallback to environment variable
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  throw new Error(
    "DATABASE_URL not found. Set INFISICAL_TOKEN + INFISICAL_PROJECT_ID or DATABASE_URL env var."
  );
}

export async function initDb() {
  if (!pool) {
    const databaseUrl = await getDatabaseUrl();
    pool = new Pool({
      connectionString: databaseUrl,
    });
  }
  return drizzle(pool, { schema });
}

export const db = await initDb();
