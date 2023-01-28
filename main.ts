import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

let program;

// Imports to rust
const getMemory = (ptr: number, len: number) => {
  const memory = new Uint8Array(program.memory.buffer);
  return memory.subarray(ptr, ptr + len);
};

const wasmCode = await Deno.readFile("app.wasm");
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, {
  env: {
    _print: (ptr: number, len: number) => {
      const buffer = getMemory(ptr, len);
      const message = new TextDecoder().decode(buffer);
      console.log(message);
    },
  },
});
program = wasmInstance.exports;

// Exports from rust
const main = program.main as () => void;

serve((req: Request) => {
  const url = new URL(req.url);
  if (url.pathname == "/") {
    main();
    return new Response("Function executed\n");
  }

  return new Response("404 Not Found\n", {
    status: 404,
  });
});
