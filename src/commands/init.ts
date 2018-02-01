import * as path from "path";
import { Arguments } from "../isotropy";

export async function run(args: Arguments, cwd: string) {
  const dir =
    typeof args.items[1] !== "undefined" ? path.resolve(args.items[1]) : cwd;
}
