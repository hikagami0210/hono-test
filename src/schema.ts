import { z } from "@hono/zod-openapi";

export const Article = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});

export const Articles = z.array(Article);

export const ArticleCreate = z.object({
  title: z.string(),
  content: z.string(),
});

export const ArticlePram = z.object({
  articleId: z.string().openapi({
    param: {
      in: "path",
      required: true,
      description: "ArticleのID",
    },
    example: "1",
  }),
});
