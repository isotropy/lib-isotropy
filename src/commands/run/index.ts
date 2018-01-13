import path from "path";
import * as configUtil from "../../config";
import * as build from "../build";
import { IsotropyConfig } from "../../isotropy";
import exception from "../../exception";
import httpService from "../../services/http";

function getServiceByName(service: string, config: IsotropyConfig) {
  return (
    config.services.find(s => s.name === service) ||
    exception(`The service ${service} was not found.`)
  );
}

export async function runService(service: string, config: IsotropyConfig) {
  const serviceConfig = await getServiceByName(service, config);

  const buildResult = await build.buildService(service, config);
  if (serviceConfig.type === "http") {
    httpService(buildResult);
  } else {
    throw new Error(`Invalid service type ${service}.`);
  }
}

export async function run(args: string[]) {
  const dir = path.resolve(args[0]) || process.cwd();
  const config = await configUtil.read(dir);

  // By default we're going to build all services.
  for (const service of config.services) {
    await runService(service.name, config);
  }
}
