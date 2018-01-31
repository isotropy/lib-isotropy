import Server from "isotropy-webserver";

const app = new Server();

app.addRoutes([
  [
    "GET",
    "/hello",
    async ctx => {
      ctx.body = "hello, world";
    }
  ]
]);

export default app;