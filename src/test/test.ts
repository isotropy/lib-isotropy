import "mocha";
import "should";
import * as path from "path";
import * as fs from "fs";
import request = require("supertest");
import koa from "koa";
import isotropy from "../isotropy";
import { Server } from "http";

const cwd = path.join(__dirname, "../");

interface HttpService {
  listen(): Server;
  close(): void;
}

describe("isotropy", async () => {
  it("builds", async () => {
    const projPath = path.join(cwd, "test/fixtures/basic");
    const result = await isotropy(
      { items: ["build", projPath], named: {} },
      cwd
    );
    ["client/dist/index.js", "server/dist/index.js"].forEach(p =>
      fs.existsSync(path.join(projPath, p)).should.be.true()
    );
  });

  it("runs", async () => {
    const projPath = path.join(cwd, "test/fixtures/basic");
    const apps = (await isotropy(
      { items: ["run", projPath], named: {} },
      cwd
    )) as HttpService[];

    await Promise.all(
      apps.map(async app => {
        const server = app.listen();
        const response = await request(server)
          .get(`/hello`)
          .expect(200);

        response.text.should.equal("hello, world!");
        server.close();
      })
    );
  });
});
