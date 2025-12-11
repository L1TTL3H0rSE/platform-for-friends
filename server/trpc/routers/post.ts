import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const posts = [
  { id: "1", title: "Сбор на лечение котика" },
  { id: "2", title: "Помощь приюту для собак" },
];

export const postRouter = router({
  getPosts: publicProcedure.query(() => {
    return posts;
  }),

  addPost: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const newPost = { id: String(Date.now()), title: input.title };
      posts.push(newPost);
      return newPost;
    }),
});
