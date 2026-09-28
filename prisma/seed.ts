import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      nama: 'Administrator',
      nik: '0000000000000000',
      email: 'admin@example.com',
      noHp: '081234567890',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', admin)

  const userPassword = await bcrypt.hash('user123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      nama: 'User Biasa',
      nik: '1111111111111111',
      email: 'user@example.com',
      noHp: '089876543210',
      password: userPassword,
      role: 'USER',
    },
  })

  console.log('User created:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
