import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";
import { manualChunksPlugin } from "vite-plugin-webpackchunkname";

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return {
    plugins: [
      react(),
      viteEnv.VITE_REPORT && visualizer(),
      viteEnv.VITE_BUILD_GZIP && compression({ threshold: 1025 }),
      manualChunksPlugin(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    server: {
      port: viteEnv.VITE_PORT,
      cors: true,
      proxy: {
        [viteEnv.VITE_API_BASE_URL]: {
          target: viteEnv.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },

    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: "dist",
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式 npm i terser -D
      // minify: "esbuild",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "js/chunk-[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (["react", "react-dom", "react-router-dom"].some((item) => id.includes(item))) {
                return "react";
              }
              //最小化拆分包
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
        },
      },
    },
  };
});

/** 对获取的环境变量做类型转换 */
function wrapperEnv(envConf: Record<string, string>) {
  const ret: Record<string, any> = {};
  for (const envName of Object.keys(envConf)) {
    let realName: any = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") realName = Number(realName);

    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
