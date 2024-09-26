import { PrismaClient, Prisma } from "@prisma/client";

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
        const includePosts = false;
        let user = Prisma.UserCreateInput;

        if (includePosts) {
            user = {
                email: "HI@HI@HI@HI",
                name: "HI@HI@HI@HI",
                posts: {
                    create: {
                        title: "Awesome post"
                    },
                },
            }
        } else {
            user = {
                email: "HI@HI@HI@HI",
                name: "HI@HI@HI@HI"
            }
        }
        // const user = await prisma.user.create({
        //     data: {
        //         email: "blahblahblah@blahblahblah.com",
        //         name: "blahblahblahblah"
        //     }
        // })
        const createUser = await prisma.user.create({ data: user }).then(console.log);
    }

    static async createMany() {
        const createMany = await prisma.user.createMany({
            data: [
                { name: "A", email: "A@A" },
                { name: "AA", email :"AA@AA" },
                { name: "AAA", email: "AAA@AAA" },
                { name: "AAAA", email: "AAAA@AAAA" }
            ],
        }).then(console.log);
    }

    static async createManyAndReturn() {
        const createManyAndReturn = await prisma.user.createManyAndReturn({
            data: [
                { name: "asd", email: "asdf@a" },
                { name: "affas", email: "afgad@sd" },
                { name: "asfgdagds", email: "afgds@fgh" },
                { name: "afdsagagdsgads", email: "agdsagds@jklz"}
            ]
        }).then(console.log);
    }

    static async findUnique() {
        const user = await prisma.user.findUnique({
            where: {
                email: "Ryan@me.com"
            },
        }).then(console.log);

        const user2 = await prisma.user.findUnique({
            where: {
                id: 4
            },
        }).then(console.log);
    }

    static async findMany() {
        const users = await prisma.user.findMany().then(console.log);
    }

    static async findFirst() {
        const findUser = await prisma.user.findFirst({
            where: {
                posts: {
                    some: {
                        title: {
                            contains: "a"
                        }
                    }
                }
            },
            orderBy: {
                id: "desc",
            }
        }).then(console.log);
    }

    static async filterRecords() {
        const users = await prisma.user.findMany({
            where: {
                email: {
                    endsWith: ".com"
                },
            },
        }).then(console.log);

        const users2 = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            startsWith: "R",
                        }
                    },{
                        AND: {
                            name: {
                                startsWith: "y",
                            },
                            role: {
                                equals: "ADMIN",
                            }
                        }
                    }
                ]
            }
        }).then(console.log);

        const users3 = await prisma.user.findMany({
            where: {
                email: {
                    endsWith: ".com"
                },
                posts: {
                    some: {
                        published: true,
                    }
                }
            }
        }).then(console.log);
    }

    static async selectSpecificFields() {
        const user = await prisma.user.findUnique({
            where: {
                email: "Ryan@me.com"
            },
            select: {
                email: true,
                name: true
            }
        }).then(console.log);

        const user2 = await prisma.user.findUnique({
            where: {
                email: "Ryan@me.com"
            },
            select: {
                email: true,
                posts: {
                    select: {
                        title: true
                    }
                }
            }
        }).then(console.log);
    }

    static async selectRelatedRecords() {
        const users = await prisma.user.findMany({
            where: {
                role: "ADMIN",
            },
            include: {
                posts: true
            }
        })
            .then(console.log);
    }

    static async update() {
        const updateUser = await prisma.user.update({
            where: {
                id: 8
            },
            data: {
                name: "A"
            }
        }).then(console.log);
    }

    static async updateMany() {
        const updateUsers = await prisma.user.updateMany({
            where: {
                email: {
                    contains: ".com"
                },
            },
            data: {
                role: "ADMIN",
            },
        }).then(console.log);
    }

    static async upsertUser() {
        const upsertUser = await prisma.user.upsert({
            where: {
                email: "cookies@cookies.com",
            },
            update: {
                name: "Cookies"
            },
            create: {
                email: "cookies@cookies.com",
                name: "Cookies@Cookies",
            }
        }).then(console.log);
    }

    static async updatePinnedBy() {
        const updatePinnedBy = await prisma.post.updateMany({
            where: {
                pinnedById: {
                    lt: 4
                }
            },
            data: {
                pinnedById: 4
            }
        }).then(console.log);

        const updatePinnedBy2 = await prisma.post.updateMany({
            where: {
                pinnedById: {
                    lt: 4
                }
            },
            data: {
                pinnedById: {
                    increment: 3
                }
            }
        }).then(console.log);
    }
}

CRUD.updatePinnedBy();