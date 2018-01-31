import* as path from "path";
import { Arguments, IsotropyConfig, ServiceConfig } from "../../isotropy";
import { read } from "../../config";
import { buildAllModules } from "../build";
import exception from "../../exception";
import importModule from "../../import-module";

async function runService(
  dir: string,
  service: ServiceConfig,
  config: IsotropyConfig
) {
  const serviceName = `isotropy-service-${service.type}`;
  const serviceModule = await importModule(serviceName, dir);
  const fn = serviceModule.default || serviceModule;
  return serviceModule
    ? await fn(
      dir,
      service
    )
    : exception(
        `Don't know how to execute ${
          service.type
        }. Try npm install ${serviceName}?`
      );
}

export async function runAllServices(dir: string, config: IsotropyConfig) {
  const buildResult = await buildAllModules(dir, config);

  return await Promise.all(
    config.services.map(x => runService(dir, x, config))
  );
}

export async function run(args: Arguments, cwd: string) {
  const dir = typeof args.items[1] !== "undefined" ? path.resolve(args.items[1]) : cwd;
  const config = await read(dir);
  return await runAllServices(dir, config);
}
