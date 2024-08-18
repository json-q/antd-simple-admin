import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";
import { vitePluginFakeServer } from "vite-plugin-fake-server";

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd());
  const isProd = config.mode === "production";
  const viteEnv = wrapperEnv(env);

  return {
    plugins: [
      react(),
      viteEnv.VITE_REPORT && visualizer(),
      viteEnv.VITE_BUILD_GZIP && compression({ threshold: 10240 }),
      vitePluginFakeServer({
        include: "mock",
        infixName: "mock",
        enableProd: true,
        enableDev: true,
      }),
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
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },

    esbuild: {
      drop: isProd && viteEnv.VITE_DROP_CONSOLE ? ["console", "debugger"] : [],
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "js/chunk-[name]-[hash].js",
          entryFileNames: "js/[name]-[hash].js",
          assetFileNames: "[ext]/[name]-[hash].[ext]",
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
