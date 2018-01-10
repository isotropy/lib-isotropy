import help from "./commands/help";
import build from "./commands/build";
import init from "./commands/init";
import run from "./commands/run";

if (process.argv.length > 2) {
  const commands = {
    help,
    build,
    init,
    run
  };

  const command = process.argv[2];
  commands[command](process.argv.slice(3));
} else {
  console.log("Missing argument. Type 'isotropy help' for help.")
}