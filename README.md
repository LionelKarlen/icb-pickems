# ICB Töggeli Pickems
> A small pickems webapp for the töggeli tournament at ICB

## Getting Started
As a solidjs project, there are few dependencies needed to get started. The repository contains a flake with devShell definitions, that trivialise getting started.
```bash
$ nix develop
```
Will enter a shell with the lsp setup, ready to connect your editor. \

```bash
$ nix develop .#serve
```
Will enter a shell and execute the vite dev script, as well as a local pocketbase instance, both running in mprocs. This lets you easily control both processes at a glance. Vite supports HMR, so you'll most likely never even need to interact with these processes.

## Building
Install dependencies and run the build script. Static files are written to the `dist` folder, which can then be served by any webserver. The project relies on pocketbase for the backend, and as such it is intended to use `dist` as `pb_public`.
```bash
$ yarn
$ yarn build
```

Alternatively, the project can be built using the nix flake, which will handle the entire process and return a result folder with `pb_public` and `pb_migrations` subfolders.
```bash
$ nix build
```
