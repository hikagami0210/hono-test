import { OpenAPIHono } from "@hono/zod-openapi";
import {
  articleCreateRoute,
  articleDeleteRoute,
  articleRoute,
  articlesRoute,
} from "./route";
import { swaggerUI } from "@hono/swagger-ui";

const articles = [
  {
    id: 1,
    title: "Title1",
    content: "Content1",
  },
  {
    id: 2,
    title: "Title2",
    content: "Content2",
  },
  {
    id: 3,
    title: "Title3",
    content: "Content3",
  },
];

const app = new OpenAPIHono();

app.get("/", (c) => {
  return c.json({
    message: "Hello Hono!",
  });
});

app.openapi(articlesRoute, async (c) => {
  return c.json([...articles]);
});

app.openapi(articleRoute, async (c) => {
  const { articleId } = c.req.valid("param");
  return c.json(articles.find((a) => a.id === Number(articleId)));
});

app.openapi(articleCreateRoute, async (c) => {
  try {
    const { title, content } = await c.req.json();
    const article = {
      id: articles.length + 1,
      title,
      content,
    };
    articles.push(article);
    return c.json(articles);
  } catch (e) {
    return c.json({ message: "Bad Request" }, { status: 400 });
  }
});

app.openapi(articleDeleteRoute, async (c) => {
  const { articleId } = c.req.valid("param");
  const index = articles.findIndex((a) => a.id === Number(articleId));
  if (index === -1) {
    return c.json({ message: "Not Found" }, { status: 404 });
  }
  articles.splice(index, 1);
  return c.json(articles);
});

app.doc31("/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
