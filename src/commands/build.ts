import * as fse from "fs-extra";
import * as path from "path";
import { read } from "../config";
import exception from "../exception";
import importModule from "../import-module";
import {
  IsotropyConfig,
  TaskPlugin,
  BuildConfig,
  Arguments,
  ModuleConfig
} from "../isotropy";

async function buildModule(
  module: ModuleConfig,
  dir: string,
  config: IsotropyConfig
) {
  async function build(moduleName: string, buildConfig: BuildConfig) {
    const buildModuleName = `isotropy-build-${buildConfig.type}`;
    const buildModule = await importModule(buildModuleName, dir);
    const moduleDir = path.join(dir, moduleName);
    const result = buildModule
      ? await buildModule.default(moduleDir, buildConfig, { fse })
      : exception(
          `Don't know how to build ${
            buildConfig.type
          }. Try npm install ${buildModuleName}?`
        );
    return result;
  }

  return module.builds
    ? await Promise.all(module.builds.map(x => build(module.name, x)))
    : [];
}

export async function buildAllModules(dir: string, config: IsotropyConfig) {
  return await Promise.all(
    config.modules.map(x => buildModule(x, dir, config))
  );
}

export async function run(args: Arguments, cwd: string) {
  const dir =
    typeof args.items[1] !== "undefined" ? path.resolve(args.items[1]) : cwd;
  const config = await read(dir);
  return await buildAllModules(dir, config);
}
