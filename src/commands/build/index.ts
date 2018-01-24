import fs from "fs";
import os from "os";
import path from "path";
import { read } from "../../config";
import exception from "../../exception";
import importModule from "../../import-module";
import { IsotropyConfig, TaskPlugin, BuildConfig, Arguments } from "../../isotropy";

async function buildModule(
  moduleName: string,
  dir: string,
  config: IsotropyConfig
) {
  const module =
    config.modules.find(m => m.name === moduleName) ||
    exception(`The module ${moduleName} was not found.`);

  async function build(build: BuildConfig) {
    const buildModuleName = `isotropy-build-${build.type}`;
    const buildModule = await importModule(buildModuleName, dir);
    return buildModule
      ? buildModule.run()
      : exception(
          `Don't know how to build ${
            build.type
          }. Try npm install ${buildModuleName}?`
        );
  }

  return await Promise.all(module.builds.map(x => build(x)));
}

export async function buildAllModules(dir: string, config: IsotropyConfig) {
  // Find all services that need to run. Build all dependant modules.
  const modules = config.services.reduce(
    (acc, svc) => acc.concat(svc.modules),
    [] as string[]
  );

  return await Promise.all(
    modules.map(moduleName => buildModule(moduleName, dir, config))
  );
}

export async function run(args: Arguments, cwd: string) {
  const dir = typeof args._[0] !== "undefined" ? path.resolve(args._[0]) : cwd;
  const config = await read(dir);
  return await buildAllModules(dir, config);
}
