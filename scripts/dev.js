import minimist from "minimist";
import path from "path";
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import esbuild from "esbuild";

const args = minimist(process.argv.slice(2))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const target = args._[0] || "reactivity";
const format = args.f || "iife";

const entry = path.resolve(__dirname, `../packages/${target}/src/index.ts`);

const pkg = require(`../packages/${target}/package.json`);

esbuild
  .context({
    entryPoints: [entry], // 入口
    outfile: path.resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 出口
    bundle: true, // reactivity -> shared  会打包到一起
    platform: "browser", // 打包后给浏览器使用
    sourcemap: true, // 可以调试源代码
    format, // cjs esm iife
    globalName: pkg.buildOptions?.name,
  })
  .then((ctx) => {
    console.log("start dev");
    return ctx.watch(); // 监控入口文件持续进行打包处理
  });

