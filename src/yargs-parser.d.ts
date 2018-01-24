declare module "yargs-parser" {
  interface Arguments {
    /** Non-option arguments */
    _: string[];
    /** The script name or node command */
    $0: string;
    /** All remaining options */
    [argName: string]: any;
  }

  function fn(args: string[]) : Arguments
  export = fn;
}
