import { createTRPCRouter } from "~/server/api/trpc";
import { khatmRouter } from "./routers/khatmRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  khatm: khatmRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
