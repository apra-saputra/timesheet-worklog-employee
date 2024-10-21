import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async () => {
    // Seed Users
    await prisma.user.createMany({
      data: [
        {
          name: "John Doe",
          email: "johndoe@email.com",
          password: "hashed_password_1", // Ganti dengan password yang sudah di-hash
        },
        {
          name: "Michael",
          email: "michael@email.com",
          password: "hashed_password_2", // Ganti dengan password yang sudah di-hash
        },
        {
          name: "Jane Smith",
          email: "janesmith@email.com",
          password: "hashed_password_3", // Ganti dengan password yang sudah di-hash
        },
        {
          name: "Emily Johnson",
          email: "emily@email.com",
          password: "hashed_password_4", // Ganti dengan password yang sudah di-hash
        },
        {
          name: "Chris Evans",
          email: "chris@email.com",
          password: "hashed_password_5", // Ganti dengan password yang sudah di-hash
        },
      ],
    });

    const users = await prisma.user.findMany({});

    console.log("Users seeded:", users);

    // Seed Projects
    await prisma.project.createMany({
      data: [
        {
          name: "Project A",
          location: "Solo",
        },
        {
          name: "Project B",
          location: "Semarang",
        },
      ],
    });

    const projects = await prisma.project.findMany();

    console.log("Projects seeded:", projects);

    // Seed WorkLogs
    const workLogs = await prisma.workLog.createMany({
      data: [
        {
          hoursWorked: 4,
          dateWorked: new Date("2024-10-01T08:00:00Z"),
          detail: "Open Valve",
          userId: users[0].id, // Ganti dengan ID pengguna yang sesuai
          projectId: projects[0].id, // Ganti dengan ID proyek yang sesuai
        },
        {
          hoursWorked: 4,
          dateWorked: new Date("2024-10-01T12:00:00Z"),
          detail: "Migrasi",
          userId: users[0].id, // Ganti dengan ID pengguna yang sesuai
          projectId: projects[0].id, // Ganti dengan ID proyek yang sesuai
        },
        {
          hoursWorked: 8,
          dateWorked: new Date("2024-10-02T12:00:00Z"),
          detail: "Recap",
          userId: users[1].id, // Ganti dengan ID pengguna yang sesuai
          projectId: projects[0].id, // Ganti dengan ID proyek yang sesuai
        },
        {
          hoursWorked: 8,
          dateWorked: new Date("2024-10-03T12:00:00Z"),
          detail: "Survey",
          userId: users[1].id, // Ganti dengan ID pengguna yang sesuai
          projectId: projects[1].id, // Ganti dengan ID proyek yang sesuai
        },
      ],
    });

    console.log("WorkLogs seeded:", workLogs);
  });
}

async function mainDelete() {
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.project.deleteMany(),
    prisma.workLog.deleteMany(),
  ]);

  console.log("deleting data");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
