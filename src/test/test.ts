import "mocha";
import "should";
import * as path from "path";
import * as fse from "fs-extra";
import request = require("supertest");
import koa from "koa";
import isotropy from "../lib-isotropy";
import { Server } from "http";

const cwd = path.join(__dirname, "../");

interface HttpService {
  listen(): Server;
  close(): void;
}

describe("isotropy", async () => {
  it("inits", async () => {
    const projPath = path.join(cwd, "test/fixtures/hello");
    const apps = await isotropy(
      { items: ["init", projPath], named: {} },
      projPath
    );
  }).timeout(25000);

  it("fails to init if non-empty", async () => {
    let error;
    try {
      const projPath = path.join(cwd, "test/fixtures/hello2");
      fse.mkdirpSync(projPath);
      fse.writeFileSync(
        path.join(projPath, "hello.txt"),
        "this should scare init."
      );
      const apps = await isotropy(
        { items: ["init", projPath], named: {} },
        projPath
      );
    } catch (ex) {
      error = ex.message;
    }
    /is not empty\.$/.test(error).should.be.true();
  }).timeout(25000);

  it("builds", async () => {
    const projPath = path.join(cwd, "test/fixtures/basic");
    const result = await isotropy(
      { items: ["build", projPath], named: {} },
      cwd
    );
    ["client/dist/index.js", "server/dist/index.js"].forEach(p =>
      fse.existsSync(path.join(projPath, p)).should.be.true()
    );
  }).timeout(25000);

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
  }).timeout(25000);
});
