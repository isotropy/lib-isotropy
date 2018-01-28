import isotropy from "./isotropy";

debugger;
isotropy({ items: process.argv.slice(4), named: {} }, process.cwd()).then(
  n => console.log("OK", n),
  ex => console.log("ERROR", ex, ex.stack)
);
