import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ['index.js'],
    outdir: 'dist',
    bundle: true,
    minify: true,
    platform: 'browser',
})
