import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'

async function main() {

  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set')
    process.exit(1)
  }

  const saltedAdminPassword = await bcrypt.hash(adminPassword, 10)

  const response = await Promise.all([
    prisma.user.upsert({
      where: { email: 'wkufj@wku.edu' },
      update: {},
      create: {
        name: 'WKU FJ Admin',
        email: 'wkufj@wku.edu',
        image: 'https://images.ctfassets.net/e5382hct74si/2P1iOve0LZJRZWUzfXpi9r/9d4d27765764fb1ad7379d7cbe5f1043/ucxb4lHy_400x400.jpg',
        saltedPassword: saltedAdminPassword,
      },
    }),
  ])
  console.log(response)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
