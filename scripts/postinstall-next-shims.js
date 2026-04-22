const fs = require("fs");
const path = require("path");

const nextComponentsDir = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "client",
  "components"
);

const shims = [
  ["not-found-error.js", "not-found.js"],
  ["unauthorized-error.js", "unauthorized.js"],
  ["forbidden-error.js", "forbidden.js"]
];

if (!fs.existsSync(nextComponentsDir)) {
  process.exit(0);
}

for (const [shimName, targetName] of shims) {
  const shimPath = path.join(nextComponentsDir, shimName);
  const targetPath = path.join(nextComponentsDir, targetName);

  if (!fs.existsSync(targetPath) || fs.existsSync(shimPath)) {
    continue;
  }

  const relativeTarget = `./${targetName}`;
  const shimSource = `"use strict";\nmodule.exports = require(${JSON.stringify(relativeTarget)});\n`;
  fs.writeFileSync(shimPath, shimSource, "utf8");

  const targetMapPath = path.join(nextComponentsDir, `${targetName}.map`);
  const shimMapPath = path.join(nextComponentsDir, `${shimName}.map`);
  if (fs.existsSync(targetMapPath) && !fs.existsSync(shimMapPath)) {
    fs.copyFileSync(targetMapPath, shimMapPath);
  }
}
