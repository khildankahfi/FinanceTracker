import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add any Neon/Prisma specific config if necessary
  // Prisma serverless connection pooling is handled via the DATABASE_URL format (using pgbouncer pooler)
  // e.g. postgres://user:password@endpoint-pooler.neon.tech/dbname?pgbouncer=true&connect_timeout=15
};

export default nextConfig;
