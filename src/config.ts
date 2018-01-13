import fs from "fs";
import path from "path";
import yaml = require("js-yaml");
import * as util from "util";
import { IsotropyConfig } from "./isotropy";

const readFile = util.promisify(fs.readFile);
const exists = util.promisify(fs.exists);

export async function read(dir: string): Promise<IsotropyConfig> {
  return ((await exists(path.join(dir, "isotropy.yaml")))
    ? yaml.safeLoad((await readFile("isotropy.yaml")).toString())
    : JSON.parse(await readFile("isotropy.json").toString())) as IsotropyConfig;
}
