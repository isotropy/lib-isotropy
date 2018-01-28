import path from "path";
import { Arguments, IsotropyConfig, ServiceConfig } from "../../isotropy";
import { read } from "../../config";
import { buildAllModules } from "../build";
import exception from "../../exception";
import importModule from "../../import-module";

async function runService(
  service: ServiceConfig,
  dir: string,
  config: IsotropyConfig
) {
  const serviceName = `isotropy-service-${service.type}`;
  const serviceModule = await importModule(serviceName, dir);
  return serviceModule
    ? serviceModule.run()
    : exception(
        `Don't know how to execute ${
          service.type
        }. Try npm install ${serviceName}?`
      );
}

export async function runAllServices(dir: string, config: IsotropyConfig) {
  const buildResult = await buildAllModules(dir, config);

  return await Promise.all(
    config.services.map(x => runService(x, dir, config))
  );
}

export async function run(args: Arguments, cwd: string) {
  const dir = typeof args.items[1] !== "undefined" ? path.resolve(args.items[1]) : cwd;
  const config = await read(dir);
  return await runAllServices(dir, config);
}
