// server/trpc/routers/campaign.ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "@@/server/utils/prisma"; // Наш синглтон

export const campaignRouter = router({
  list: publicProcedure.query(async () => {
    return await prisma.campaign.findMany({
      where: { status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const campaign = await prisma.campaign.findUnique({
        where: { slug: input.slug },
      });

      if (!campaign) {
        throw new Error("Сбор не найден");
      }
      return campaign;
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(5),
        description: z.string(),
        targetAmount: z.number().positive(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.campaign.create({
        data: {
          ...input,
          targetAmount: input.targetAmount * 100,
        },
      });
    }),
});
