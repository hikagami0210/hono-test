import { createRoute } from "@hono/zod-openapi";
import { Article, ArticleCreate, ArticlePram, Articles } from "./schema";

export const articlesRoute = createRoute({
  method: "get",
  path: "/articles",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: Articles,
        },
      },
      description: "記事一覧",
    },
    400: {
      description: "Bad Request",
    },
  },
});

export const articleRoute = createRoute({
  method: "get",
  path: "/articles/:articleId",
  request: {
    params: ArticlePram,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: Article,
        },
      },
      description: "記事詳細",
    },
  },
});

export const articleCreateRoute = createRoute({
  method: "post",
  path: "/articles",
  request: {
    body: {
      content: {
        "application/json": {
          schema: ArticleCreate,
        },
      },
    },
  },

  responses: {
    201: {
      description: "記事作成",
      content: {
        "application/json": {
          schema: ArticleCreate,
        },
      },
    },
    400: {
      description: "Bad Request",
    },
  },
});

export const articleDeleteRoute = createRoute({
  method: "delete",
  path: "/articles/:articleId",
  request: {
    params: ArticlePram,
  },
  responses: {
    200: {
      description: "記事削除",
    },
  },
});
