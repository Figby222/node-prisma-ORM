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
                email: "cookies@cookiessssssss.com",
            },
            update: {
                name: "Cookies"
            },
            create: {
                email: "cookies@cookiessssssss.com",
                name: "Cookies@Cookiessssssss",
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

    static async delete() {
        const deleteUser = await prisma.user.delete({
            where: {
                id: 17
            }
        }).then(console.log)
    }

    static async deleteMany() {
        const deleteUsers = await prisma.user.deleteMany({
            where: {
                id: {
                    gt: 24
                }
            }
        }).then(console.log);
    }

    static async deleteAll() {
        const deleteUsers = await prisma.user.deleteMany({}).then(console.log);
    }

    static async deleteUserCascade() {
        const deletePosts = prisma.post.deleteMany({
            where: {
                authorId: 17
            }
        }).then(console.log);

        const deleteUser = prisma.user.delete({
            where: {
                id: 17
            }
        }).then(console.log);
    }

    static async deleteAllTables() {
        const deletePosts = prisma.post.deleteMany().then(console.log);
        const deleteProfile = prisma.profile.deleteMany().then(console.log);
        const deleteUsers = prisma.user.deleteMany().then(console.log);

        await prisma.$transaction([deleteProfile, deletePosts, deleteUsers ]);
    }

    static async deleteRaw() {
        const tablenames = await prisma.$queryRaw(`SELECT tablename FROM pg_tables WHERE schemaname='public'`)

        const tables = tablenames
            .map(({ tablename }) => tablename)
            .filter((name) => name !== '_prisma_migrations')
            .map((name) => `"public"."${name}"`)
            .join(", ");

            try {
                await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
            } catch (err) {
                console.log({ error });
            }
    }

    static async advancedQuery() {
        const user = await prisma.user.create({
            include: {
                posts: {
                    include: {
                        categories: true,
                    },
                },
            },
            data: {
                email: "supercookies@supercookies@supercookies@supercookies",
                posts: {
                    create: [
                        {
                            title: "Awesome Post",
                            categories: {
                                connectOrCreate: [
                                    {
                                        create: { name: "Introductions" },
                                        where: {
                                            id: 3,
                                            name: "Introductions",
                                        },
                                    },
                                    {
                                        create: { name: "Social" },
                                        where: {
                                            id: 4,
                                            name: "Social",
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            title: "How to make cookies",
                            categories: {
                                connectOrCreate: [
                                    {
                                        create: { name: "Social" },
                                        where: {
                                            id: 4,
                                            name: "Social",
                                        },
                                    },
                                    {
                                        create: { name: "Cooking" },
                                        where: {
                                            id: 5,
                                            name: "Cooking",
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        }).then(console.log);
    }
}

// CRUD.advancedQuery();

class RawQueries {
    static async $queryRaw() {
        const result = await prisma.$queryRaw`SELECT * FROM User`.then(console.log);
    }

    static async $queryRaw2() {
        const email = `Ryan@me.com`;
        const result = await prisma.$queryRaw`SELECT * FROM User WHERE email = ${email}`.then(console.log)
    }

    static async $queryRaw3() {
        const email = `Ryan@me.com`;
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT * FROM User WHERE email = ${email}`
        ).then(console.log);
    }

    static async $queryRaw4() {
        const name = `My name is Ryan`;
        const result = await prisma.$queryRaw`SELECT ${name}`.then(console.log);

        const name2 = `Ryan`;
        const result2 = await prisma.$queryRaw`SELECT 'My name is ' || ${name2}`.then(console.log);
    }

    static async tablename() {
        const userTable = `User`;
        const result = await prisma.$queryRawUnsafe(`SELECT * FROM ${userTable}`).then(console.log);
    }

    static async paramaterizedQuery() {
        prisma.$queryRawUnsafe(
            `SELECT * FROM users WHERE email = $1`,
            `cookies@cookies.com`
        )
    }

    static async executeRaw() {
        const result = await prisma.$executeRaw`UPDATE User SET active = true WHERE emailValidated = true`.then(console.log);
    }

    static async executeRaw2() {
        const active = true;
        const emailValidated = true;
        const result = await prisma.$executeRaw`UPDATE User SET active = ${active} WHERE EmailValidated = ${emailvalidated}`.then(console.log);
    }

    static async executeRaw3() {
        const name = `My name is Ryan`;
        const result = await prisma.$executeRaw`UPDATE user SET greeting = ${name}`.then(console.log);

        const name2 =  `Ryan`;
        const greeting = await prisma.$executeRaw`UPDATE user SET greeting = 'My name is ' || ${name}`.then(console.log);
    }

    static async activeEmailValidated() {
        const emailValidated = true;
        const active = true;

        const result = await prisma.$executeRawUnsafe(
            `UPDATE User SET active = ${active} WHERE emailValidated = ${emailValidated}`
        )
            .then(console.log);
    }

    static async activeEmailParamaterizedQuery() {
        const result = prisma
            .$executeRawUnsafe(
            `UPDATE User SET active = $1 WHERE emailValidated = $2`,
            `cookies@cookies.com`,
            true
        )
            .then(console.log);
    }

    static async typeCast() {
        const result = await prisma.$queryRaw`SELECT LENGTH(${42}::text)`.then(console.log);
    }

    static async taggedTemplate() {
        const userId = 4;
        const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${userId}`.then(console.log);
    }

    static async taggedTemplateHelpers() {
        const ids = [ 1, 2, 3, 4 ];
        const result = await prisma.$queryRaw`SELECT * FROM User WHERE id IN (${Prisma.join(ids)})`.then(console.log);

        const userName = '';
        const result2 = await prisma.$queryRaw`SELECT * FROM User ${
            userName ? Prisma.sql`WHERE name = ${userName}` : Prisma.empty
        }`.then(console.log);
    }

    static async alterUser() {
        const password = "blah blah blah blah";
        const result = await prisma.$executeRawUnsafe(`ALTER USER prisma WITH PASSWORD "$1"`, password)
    }

    static async safeQuery() {
        const inputString = `'Sarah' UNION SELECT id, title FROM "Post"`;

        const query = Prisma.sql`SELECT id, name FROM "User" WHERE name = ${inputString}`;

        const result = await prisma.$queryRaw(query);
        console.log(result);
    }

    static async safeQuery2() {
        const query

        = Prisma.sql`SELECT id, name FROM "User" WHERE name = $1`;

        const inputString = `'Sarah' UNION SELECT id, title FROM "Post"`;
        query.values = [inputString];

        const result = await prisma.$queryRaw(query);
        console.log(result);
    }

    static async buildQuery() {
        const query1 = `SELECT id, name FROM "User" WHERE name = `;
        const query2 = ` OR name = `;

        const inputString1 = "Awesome Slice";
        const inputString2 = `'Sarah' UNION SELECT id, title FROM "Post"`;

        const query = Prisma.sql([query1, query2, ""], inputString1, inputString2);
        const result = await prisma.$queryRaw(query).then(console.log);
    }

    static async buildQuery2() {
        const query1 = `SELECT id, name FROM "user" `;
        const query2 = `WHERE name = $1 `;

        query = Prisma.raw(`${query1}${query2}`);

        const inputString = `'Sarah' UNION SELECT id, title FROM "Post"`;
        query.values = [inputString];

        const result = await prisma.queryRaw(query).then(console.log);
    }

    static async buildQuery3() {
        const userName = `Awesome Slice`;
        const email = `AwesomeSlice@AwesomeSlice.com`;
        const result = await prisma.$queryRawUnsafe(
            `SELECT * FROM User WHERE (name = $1 OR email = $2)`,
            userName,
            email
        ).then(console.log);
    }

    static async buildQuery4() {
        const userName = `Awesome Slice`;
        const emailFragment = `AwesomeSlice.com`;

        const result = await prisma.$queryRawUnsafe(
            `SELECT * FROM "User" WHERE (name = $1 OR email ILIKE $2)`,
            userName,
            `%${emailFragment}`
        ).then(console.log);
    }
}

async function populateDb() {
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

    const createPost = await prisma.post.create({
        data: {
            title: "Hi",
            content: "Hi",
            authorId: 1
        }
    })

    await prisma.user.create({
        data: {
            name: "Me",
            email: "me@me.com",
            posts: {
                create: { title: "Hi" }
            },
        },
    }).then(console.log);

    await prisma.user.create({
        data: {
            name: "Me Ryan",
            email: "Ryan@me.com",
            posts: {
                create: { title: "Hi" }
            },
        },
    }).then(console.log);

    const user2 = await prisma.user.create({
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

    const userAndPosts = await prisma.user.create({
        data: {
            email: "AwesomeEmail@AwesomeDomain.com",
            name: "Awesome Name",
            posts: {
                create: [
                    { title: "blah blah blah" },
                    { title: "blah blah blah blah" }
                ]
            }
        }
    })

    const includePosts = false;
        let user3 = Prisma.UserCreateInput;

        if (includePosts) {
            user3 = {
                email: "HI@HI@HI@HI",
                name: "HI@HI@HI@HI",
                posts: {
                    create: {
                        title: "Awesome post"
                    },
                },
            }
        } else {
            user3 = {
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
        const createUser = await prisma.user.create({ data: user3 }).then(console.log);

        const createMany = await prisma.user.createMany({
            data: [
                { name: "A", email: "A@A" },
                { name: "AA", email :"AA@AA" },
                { name: "AAA", email: "AAA@AAA" },
                { name: "AAAA", email: "AAAA@AAAA" }
            ],
        }).then(console.log);

        const createManyAndReturn = await prisma.user.createManyAndReturn({
            data: [
                { name: "asd", email: "asdf@a" },
                { name: "affas", email: "afgad@sd" },
                { name: "asfgdagds", email: "afgds@fgh" },
                { name: "afdsagagdsgads", email: "agdsagds@jklz"}
            ]
        }).then(console.log);

        const user4 = await prisma.user.create({
            include: {
                posts: {
                    include: {
                        categories: true,
                    },
                },
            },
            data: {
                email: "supercookies@supercookies@supercookies@supercookies",
                posts: {
                    create: [
                        {
                            title: "Awesome Post",
                            categories: {
                                connectOrCreate: [
                                    {
                                        create: { name: "Introductions" },
                                        where: {
                                            id: 3,
                                            name: "Introductions",
                                        },
                                    },
                                    {
                                        create: { name: "Social" },
                                        where: {
                                            id: 4,
                                            name: "Social",
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            title: "How to make cookies",
                            categories: {
                                connectOrCreate: [
                                    {
                                        create: { name: "Social" },
                                        where: {
                                            id: 4,
                                            name: "Social",
                                        },
                                    },
                                    {
                                        create: { name: "Cooking" },
                                        where: {
                                            id: 5,
                                            name: "Cooking",
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
        }).then(console.log);

}








populateDb();
// RawQueries.alterUser();