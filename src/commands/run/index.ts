import path from "path";
import { Arguments, IsotropyConfig } from "../../isotropy";
import { read } from "../../config";
import { buildAllModules } from "../build";

async function runService() {

}

export async function runAllServices(dir: string, config: IsotropyConfig) {
  const buildResult =  await buildAllModules(dir, config);
  
}

export async function run(args: Arguments, cwd: string) {
  const dir = typeof args._[0] !== "undefined" ? path.resolve(args._[0]) : cwd;
  const config = await read(dir);
  return await runAllServices(dir, config);
}
