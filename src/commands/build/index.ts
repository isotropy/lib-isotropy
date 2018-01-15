import fs from "fs";
import os from "os";
import path from "path";
import exception from "../../exception";

import { IsotropyConfig, BuildPlugin } from "../../isotropy";

export type BuildResult = {
  root: string;
};

function getService(service: string, config: IsotropyConfig) {
  return (
    config.services.find(x => x.name === service) ||
    exception(`The service ${service} was not found.`)
  );
}

function getModule(module: string, config: IsotropyConfig) {
  return (
    config.modules.find(x => x.name === module) ||
    exception(`The module ${module} was not found.`)
  );
}

export async function buildService(
  service: string,
  config: IsotropyConfig
): Promise<BuildResult> {
  //We start by creating temporary space for the build.
  const tmpdir = os.tmpdir();
  const subdir = "isotropy_build_" + Date.now();
  const root = path.join(tmpdir, subdir);

  const serviceConfig = getService(service, config);

  for (const module in serviceConfig.build) {
    await buildModule(source, module, root, config);
  }

  return {
    root
  };
}

async function getBuildPlugin(type: string): Promise<BuildPlugin> {
  return;
}

async function buildModule(
  source: string,
  moduleName: string,
  root: string,
  config: IsotropyConfig
) {
  const module = getModule(moduleName, config);
  const plugin = await getBuildPlugin(module.build.type);
  plugin.run();
}

export async function run(args: string[]) {}
