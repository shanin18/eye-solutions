const fs = require("fs");
const path = require("path");

const loaderPath = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "build",
  "webpack",
  "loaders",
  "next-flight-loader",
  "module-proxy.js"
);

if (!fs.existsSync(loaderPath)) {
  process.exit(0);
}

const source = fs.readFileSync(loaderPath, "utf8");
const updated = source.replace(
  'const _server = require("next/dist/compiled/react-server-dom-webpack/server.node");',
  'const _server = require("react-server-dom-webpack/server");'
);

if (updated !== source) {
  fs.writeFileSync(loaderPath, updated, "utf8");
}
