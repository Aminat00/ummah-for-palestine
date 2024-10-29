import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient();
const JuzNumber = z.enum([
  "JUZ_1",
  "JUZ_2",
  "JUZ_3",
  "JUZ_4",
  "JUZ_5",
  "JUZ_6",
  "JUZ_7",
  "JUZ_8",
  "JUZ_9",
  "JUZ_10",
  "JUZ_11",
  "JUZ_12",
  "JUZ_13",
  "JUZ_14",
  "JUZ_15",
  "JUZ_16",
  "JUZ_17",
  "JUZ_18",
  "JUZ_19",
  "JUZ_20",
  "JUZ_21",
  "JUZ_22",
  "JUZ_23",
  "JUZ_24",
  "JUZ_25",
  "JUZ_26",
  "JUZ_27",
  "JUZ_28",
  "JUZ_29",
  "JUZ_30",
]);

export const khatmRouter = createTRPCRouter({
  // Example query to get all Khatms
  getKhatms: publicProcedure.query(async () => {
    const khatms = await prisma.khatm.findMany(); // Using Prisma Client to fetch Khatms
    return khatms;
  }),
  // Query to get the total and completed Khatm counts
  getKhatmCounts: publicProcedure.query(async () => {
    const totalKhatms = await prisma.khatm.count();
    const completedKhatms = await prisma.khatm.count({
      where: { isComplete: true },
    });

    return { totalKhatms, completedKhatms };
  }),

  // Example mutation to create a new Khatm (without requiring users initially)
  createKhatm: publicProcedure
    .input(
      z.object({
        totalJuzCount: z.number().positive(), // Required and positive
        selectedJuzNumbers: z.array(JuzNumber), // Array of selected Juz numbers
      }),
    )
    .mutation(async ({ input }) => {
      const newKhatm = await prisma.khatm.create({
        data: {
          totalJuzCount: input.totalJuzCount,
          selectedJuzNumbers: input.selectedJuzNumbers,
        },
      });
      return { message: "Khatm created successfully", khatm: newKhatm };
    }),

  submitJuz: publicProcedure
    .input(
      z.object({
        khatmId: z.string(),
        juzNumber: JuzNumber,
        userId: z.string().optional(), // Make userId optional
      }),
    )
    .mutation(async (opts) => {
      const { input } = opts;
      // Fetch the khatm along with its related juzes
      const khatm = await prisma.khatm.findUnique({
        where: { id: input.khatmId },
        include: { juzes: true }, // Include the related juzes
      });

      if (!khatm) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Khatm with id ${input.khatmId} not found`,
        });
      }

      const newJuz = await prisma.juz.create({
        data: {
          juzNumber: input.juzNumber,
          khatm: {
            connect: { id: input.khatmId },
          },
          user: input.userId
            ? {
                connect: { id: input.userId },
              }
            : undefined, // If userId is not provided, don't connect to a user
        },
      });
      // Dynamically get the count of juzes related to this specific Khatm
      const completedJuzCount = await prisma.juz.count({
        where: { khatmId: input.khatmId },
      });

      // Update the khatm with the new completed count and check if it's complete
      const isComplete = completedJuzCount + 1 >= khatm.totalJuzCount;

      await prisma.khatm.update({
        where: { id: input.khatmId },
        data: {
          completedCount: { increment: 1 },
          isComplete,
        },
      });
      return { message: "Juz submitted successfully", juz: newJuz };
    }),
});
