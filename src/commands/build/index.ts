import fs from "fs";
import os from "os";
import path from "path";
import exception from "../../exception";

import { IsotropyConfig, TaskPlugin } from "../../isotropy";

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
  root: string,
  service: string,
  config: IsotropyConfig
): Promise<BuildResult> {
  //We start by creating temporary space for the build.
  const serviceConfig = getService(service, config);

  for (const module in serviceConfig.modules) {
    await buildModule(root, module, config);
  }

  return {
    root
  };
}

async function getTaskPlugin(type: string): Promise<TaskPlugin> {
  
}

async function buildModule(
  root: string,
  moduleName: string,
  config: IsotropyConfig
) {
  const module = getModule(moduleName, config);
  for (const task of module.tasks) {
    const plugin = await getTaskPlugin(task.type);
    plugin.run();    
  }
}

export async function run(args: string[]) {}
