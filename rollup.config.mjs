import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',          // CJS keeps __dirname sane and avoids ESM interop fights with the SDKs
    sourcemap: true,
    exports: 'auto',
    inlineDynamicImports: true, // avoid code-splitting; Azure Functions needs a single file
  },
  // The ONLY thing that must not be bundled. No npm package backs it;
  // the Node worker provides it at runtime. Everything else is inlined.
  external: ['@azure/functions-core'],
  plugins: [
    json(),                                  // azure SDKs + tedious require JSON files
    resolve({
      preferBuiltins: true,                  // net/tls/crypto/dns (tedious) stay as node builtins
      exportConditions: ['node'],            // force node entry points, not browser shims
    }),
    commonjs({
      transformMixedEsModules: true,         // these deps mix require() and import
      ignoreDynamicRequires: true,           // see mssql/iconv-lite note below
    })
  ],
  // The SDK trees throw a lot of these; almost all are benign.
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  },
};