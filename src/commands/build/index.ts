import fs from "fs";

export default async function run(args: string[]) {
  //We start by creating temporary space for the build.
  const tmp = os.tmpdir();
  
  //All done. Remove temp dir.
  fs.rmdir(tmp);
}