import * as help from "./commands/help";
import * as build from "./commands/build";
import * as init from "./commands/init";
import * as run from "./commands/run";

export interface ServiceConfig {
  name: string;
  nodes?: number;
  type: string;
  build: string[];
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

export interface BuildConfig {
  type: string;
}

export interface StaticBuild extends BuildConfig {
  type: "static";
  dest: string;
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

export interface TypeScriptBuild extends BuildConfig {
  type: "typescript";
  output: string;
  bundle?: boolean;
}

export interface ModuleConfig {
  name: string,
  build: BuildConfig,
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

export interface BuildPlugin {
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
