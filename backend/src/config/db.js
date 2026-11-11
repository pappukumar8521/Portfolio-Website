import { PrismaClient } from '@prisma/client';

const defaultCloudUrl = "mysql://2zgbeGvsHWGtgpE.root:69GJOVgNMjcdbgDp@gateway01.ap-northeast-1.prod.aws.tidbcloud.com:4000/test?sslaccept=strict";

let dbUrl = process.env.DATABASE_URL;

// If DATABASE_URL is missing, or was accidentally cut off/truncated when pasted into Render UI
if (!dbUrl || dbUrl.includes('gateway01.ap-northeast-:') || (!dbUrl.includes(':4000') && dbUrl.includes('tidbcloud'))) {
  console.log('ℹ️ Using verified TiDB Cloud database connection string.');
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
