import * as help from "./commands/help";
import * as build from "./commands/build";
import * as run from "./commands/run";
import * as config from "./config";
import yargs = require("yargs-parser");

export interface Arguments {
  /** Non-option arguments */
  _: string[];
  /** The script name or node command */
  $0: string;
  /** All remaining options */
  [argName: string]: any;
}

export interface ServiceConfig {
  name: string;
  nodes?: number;
  type: string;
  modules: string[];
}

export interface ConnectionConfig {}

export interface BuildConfig {
  type: string
}

export interface ModuleConfig {
  name: string;
  builds: BuildConfig[]
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

export default async function(args: string[], cwd: string) {
  if (args.length) {
    const commands: Commands = {
      help: help.run,
      build: build.run,
      run: run.run
    };
  
    const command = args[0];
    
    commands[command](yargs(args), cwd);
  } else {
    console.log("Missing argument. Type 'isotropy help' for help.");
  }  
}

