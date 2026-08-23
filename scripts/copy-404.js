import fs from "fs";

const index = fs.readFileSync("dist/index.html", "utf8");

fs.writeFileSync("dist/404.html", index);

console.log("404.html created successfully");