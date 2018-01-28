import * as util from "util";
import * as path from "path";
import * as fs from "fs";
import exception from "./exception";

const stat = util.promisify(fs.stat);

async function exists(somePath: string) {
  try {
    const _ = await stat(somePath);
    return true;
  } catch {
    return false;
  }
}

export default async function(moduleName: string, currentDir: string) {
  const moduleDir = path.join(currentDir, "node_modules", moduleName);
  const module = await exists(moduleDir) ? require(moduleDir)
  : require(moduleName);
  return module || exception(`The module ${moduleName} was not found.`) 
}
