import * as build from "./commands/build";
import * as help from "./commands/help";
import * as init from "./commands/init";
import * as run from "./commands/run";
import * as config from "./config";

export interface Arguments {
  items: string[];
  named: { [argName: string]: string };
}

export interface ServiceConfig {
  name: string;
  nodes?: number;
  type: string;
  modules: string[];
}

export interface ConnectionConfig {}

export interface BuildConfig {
  type: string;
}

export interface ModuleConfig {
  name: string;
  builds: BuildConfig[];
  connections?: ConnectionConfig[];
}

export type IsotropyConfig = {
  name: string;
  schema: string;
  version: string;
  git: string;
  services: ServiceConfig[];
  modules: ModuleConfig[];
};

export type Command = (args: Arguments, cwd: string) => Promise<any>;

export interface TaskPlugin {
  run: Command;
}

type Commands = {
  [key: string]: Command;
};

export default async function(args: Arguments, cwd: string) {
  if (args.items.length) {
    const commands: Commands = {
      build: build.run,
      help: help.run,
      init: init.run,
      run: run.run
    };

    const command = args.items[0];
    return await commands[command](args, cwd);
  } else {
    console.log("Missing argument. Type 'isotropy help' for help.");
  }
}
