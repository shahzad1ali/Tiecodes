import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required to seed the admin user.");
  }

  if (process.env.NODE_ENV === "production") {
    if (password.length < 12) {
      throw new Error("ADMIN_PASSWORD must be at least 12 characters in production.");
    }
    if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) {
      throw new Error("AUTH_SECRET must be set (32+ characters) before seeding in production.");
    }
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, isActive: true },
    create: { email, passwordHash },
  });
  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
