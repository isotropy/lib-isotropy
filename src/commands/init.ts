import * as path from "path";
import os = require("os");
import child_process = require("child_process");
import * as fse from "fs-extra";
import download = require("download");
import unzip = require("unzip");
import { tmpdir } from "os";
import { Arguments } from "../isotropy";

export function run(args: Arguments, cwd: string) {
  return new Promise((resolve, reject) => {
    const dir =
      typeof args.items[1] !== "undefined" ? path.resolve(args.items[1]) : cwd;

    const repo = args.named.t || `https://github.com/isotropy/hello-world`;

    const url = repo.endsWith(".zip")
      ? repo
      : repo.endsWith("/")
        ? repo + "archive/master.zip"
        : repo + "/archive/master.zip";

    //create a temp directory.
    const tmpDir = path.join(
      os.tmpdir(),
      Math.random()
        .toString(36)
        .substring(7)
    );
    download(url)
      .pipe(unzip.Extract({ path: tmpDir }))
      .on("close", () => {
        const [unzippedDir] = fse.readdirSync(tmpDir);
        const destDir = path.join(tmpDir, unzippedDir);
        fse.copySync(destDir, dir);
        
        //Read metadata 
        
        const result = child_process.execSync("npm install", { cwd: dir })
        console.log(result.toString())
        resolve();
      });
  });
}
