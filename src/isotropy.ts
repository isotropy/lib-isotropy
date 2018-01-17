import * as help from "./commands/help";
import * as build from "./commands/build";
import * as init from "./commands/init";
import * as run from "./commands/run";

export interface ServiceConfig {
  name: string;
  nodes?: number;
  type: string;
  modules: string[]
}

export interface HttpServiceLocation {
  type: string;
  location: string;
}

export interface HttpServiceNodeJSLocation extends HttpServiceLocation {
  type: "nodejs";
  main: string;
}

export interface HttpServiceStaticLocation extends HttpServiceLocation {
  type: "static";
  path: string;
}

export interface HttpServiceConfig extends ServiceConfig {
  locations: HttpServiceLocation[];
}

export interface BuildTask {
  type: string;
}

export interface CopyTask extends BuildTask {
  type: "copy";
  source?: string;
  dest: string;
}

export interface TypeScriptCompileTask extends BuildTask {
  type: "typescript";
  output: string;
  bundle?: boolean;
}

export interface ConnectionConfig {}

export interface WebdiskConnection extends ConnectionConfig {
  type: "webdisk";
  path: string;
  disk: string;
}

export interface DbConnection extends ConnectionConfig {
  type: "db";
  path: string;
  db: string;
}

export interface RedisConnection extends ConnectionConfig {
  type: "redis";
  path: string;
  db: string;
}

export interface ModuleConfig {
  name: string,
  tasks: BuildTask[],
  connections?: ConnectionConfig
} 

export type IsotropyConfig = {
  name: string;
  schema: string;
  version: string;
  git: string;
  services: ServiceConfig[];
  modules: ModuleConfig[];
};

export interface TaskPlugin {
  run() : void
}

type Commands = {
  [key: string]: (args: string[]) => void;
};

if (process.argv.length > 2) {
  const commands: Commands = {
    help: help.run,
    build: build.run,
    init: init.run,
    run: run.run
  };

  //Read the config

  const command = process.argv[2];
  commands[command](process.argv.slice(3));
} else {
  console.log("Missing argument. Type 'isotropy help' for help.");
}
