import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import prisma from './config/db.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('✅ Connected to MySQL Database via Prisma');

    const server = app.listen(PORT, () => {
      console.log(`🚀 HireMitra Backend Server running on port ${PORT}`);
      console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    });

    const shutdown = async () => {
      console.log('Stopping server gracefully...');
      server.close(async () => {
        await prisma.$disconnect();
        console.log('Prisma disconnected. Server shut down.');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error('❌ Failed to connect to MySQL database:', error.message);
    process.exit(1);
  }
}

startServer();

