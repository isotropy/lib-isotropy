import fs from "fs";
import os from "os";
import path from "path";
import { read } from "../../config";
import exception from "../../exception";
import importModule from "../../import-module";
import { IsotropyConfig, TaskPlugin, BuildConfig, Arguments, ModuleConfig } from "../../isotropy";

async function buildModule(
  module: ModuleConfig,
  dir: string,
  config: IsotropyConfig
) {
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
  return await Promise.all(
    config.modules.map(x => buildModule(x, dir, config))
  );
}

export async function run(args: Arguments, cwd: string) {
  const dir = typeof args._[0] !== "undefined" ? path.resolve(args._[0]) : cwd;
  const config = await read(dir);
  return await buildAllModules(dir, config);
}
