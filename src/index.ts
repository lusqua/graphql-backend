import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import convert from "koa-convert";
import cors from "koa-cors";
import { createServer } from "http";

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, credentials: true })));

router.get("/status", (ctx) => {
  ctx.status = 200;
  ctx.body = "running";
});

app.use(router.routes()).use(router.allowedMethods());

(async () => {
  const server = createServer(app.callback());

  // start server
  server.listen(4000, () => {
    console.log("Server is running on http://localhost:4000");
  });
})();
