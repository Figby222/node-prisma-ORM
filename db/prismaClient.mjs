import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
}


main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    })