import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Cookies",
            email: "cookies@cookies.cookies",
            posts: {
                create: { title: "Hi" }
            },
            profile: {
                create: { bio: "Sandwich Cookies" }
            },
        },
    })

    console.log(user);
    
    const post = await prisma.post.update({
        where: { id: 1 },
        data: { published: true },
    });

    console.log(post);

    const createPost = await prisma.post.create({
        data: {
            title: "Hi",
            content: "Hi",
            authorId: 1
        }
    })

    console.log(createPost);
    
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true
        }
    });
    console.log(allUsers);
}


// main()
//     .then(async () => {
//         await prisma.$disconnect();
//     })
//     .catch(async (err) => {
//         console.error(err);
//         await prisma.$disconnect();
//         process.exit(1);
//     })







async function useQueries() {
    await prisma.user.update({
        where: { id: 3 },
        data: { id: 4}
    })
    await prisma.user.findMany().then(console.log);
    // await prisma.post.findMany({
    //     where: {
    //         OR: [
    //             { title: { contains: "prisma" }},
    //             { content: { contains: "prisma" }},
    //             { title: { contains: "Hi" }},
    //             { content: { contains: "Hi" }}

    //         ]
    //     }
    // }).then(console.log);

    // await prisma.user.create({
    //     data: {
    //         name: "Me Ryan",
    //         email: "Ryan@me.com",
    //         posts: {
    //             create: { title: "Hi" }
    //         },
    //     },
    // }).then(console.log);
}

// useQueries();


async function addUser() {
    const user = await prisma.user.create({
        data: {
            email: "hi@me.com",
            name: "me",
            posts: {
                create: [
                    {
                        title: "Hi, super awesome cool stuff",
                        categories: {
                            create: {
                                name: "Super awesome cool stuff"
                            },
                        },
                    },
                    {
                        title: "PostgreSQL database",
                        categories: {
                            create: [
                                {
                                    name: "Database"
                                },
                                {
                                    name: "Super awesome cool learning stuff"
                                },
                            ],
                        },
                    }
                ],
            },
        },
    });
}

// addUser();

async function createUserAndPosts() {
    const userAndPosts = await prisma.user.create({
        data: {
            posts: {
                create: [
                    { title: "blah blah blah" },
                    { title: "blah blah blah blah" }
                ]
            }
        }
    })
    return userAndPosts
}

// createUserAndPosts();

async function getAuthor() {
    const getAuthor = await prisma.user.findUnique({
        where: {
            id: 64
        },
        include: {
            posts: true
        },
    }).then(console.log);
}

// getAuthor();




async function updateAuthor() {
    const updateAuthor = await prisma.user.update({
        where: {
            id: 4
        },
        data: {
            posts: {
                connect: {
                    id: 4,
                }
            }
        }

    }).then(console.log)
}

// updateAuthor();

class CRUD {
    static async create() {
        const user = await prisma.user.create({
            data: {
                email: "blahblahblah@blahblahblah.com",
                name: "blahblahblahblah"
            }
        })
    }
}

CRUD.create();