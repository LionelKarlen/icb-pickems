{
  description = "Solidjs + Pocketbase flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        packages = {
          default = pkgs.callPackage ./icb.nix { };
        };
        devShells = {
          default =
            with pkgs;
            mkShell {
              buildInputs = [
                typescript-language-server
                pocketbase
              ];
            };

          serve =
            with pkgs;
            mkShell {
              buildInputs = [
                pocketbase
                mprocs
              ];
              shellHook = ''mprocs "deno task dev" "pocketbase serve"'';
            };
        };
      }
    );
}
