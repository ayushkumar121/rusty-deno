#!/bin/bash

set -x
cargo build --target=wasm32-unknown-unknown --release
cp target/wasm32-unknown-unknown/release/rusty_deno.wasm rusty_deno.wasm
deno run -A main.ts
