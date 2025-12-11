import { router } from "./trpc";
import { postRouter } from "./routers/post";
import { campaignRouter } from "./routers/campaign";

export const appRouter = router({
  post: postRouter,
  campaign: campaignRouter,
});

export type AppRouter = typeof appRouter;
