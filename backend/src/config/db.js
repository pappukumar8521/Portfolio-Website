import { PrismaClient } from '@prisma/client';

const defaultCloudUrl = "mysql://2zgbeGvsHWGtgpE.root:69GJOVgNMjcdbgDp@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/test?sslaccept=strict";

let dbUrl = process.env.DATABASE_URL;

// Ensure database URL is complete. If it's missing or got truncated/cut-off in Render:
const isValid = dbUrl && (dbUrl.includes('prod.aws.tidbcloud.com:4000') || dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1'));

if (!isValid) {
  console.log('ℹ️ Using verified full TiDB Cloud connection string.');
  dbUrl = defaultCloudUrl;
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});

export default prisma;
