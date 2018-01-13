import fs from "fs";
import os from "os";
import path from "path";
import exception from "../../exception";

import { IsotropyConfig } from "../../isotropy";

export type BuildResult = {
  root: string;
};

function getService(service: string, config: IsotropyConfig) {
  return (
    config.services.find(s => s.name === service) ||
    exception(`The service ${service} was not found.`)
  );
}

export async function buildService(
  service: string,
  config: IsotropyConfig
): Promise<BuildResult> {
  //We start by creating temporary space for the build.
  const tmpdir = os.tmpdir();
  const subdir = "isotropy_build_" + Date.now();
  const dir = path.join(tmpdir, subdir);

  const serviceConfig = getService(service, config);
  
  
  return {
    root: "/tmp/100/"
  };
}

export async function run(args: string[]) {
  
}
