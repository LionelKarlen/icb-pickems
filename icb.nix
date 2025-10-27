{
  stdenv,
  fetchYarnDeps,
  pkgs,
  yarnConfigHook,
  yarnBuildHook,
  ...
}:

stdenv.mkDerivation (finalAttrs: {
  name = "icb-pickems";
  version = "0.1.0";

  src = ./.;

  nativeBuildInputs = with pkgs; [
    nodejs
    yarn
    yarnConfigHook
    yarnBuildHook
  ];

  yarnOfflineCache = fetchYarnDeps {
    yarnLock = "${finalAttrs.src}/yarn.lock";
    hash = "sha256-WB4gkA85xFKfvloo/nx2+HfghN3fus+p85UckNXmRhw=";
  };

  installPhase = ''
    runHook preInstall
    mkdir -p $out/pb_migrations
    cp -r pb_migrations/* $out/pb_migrations
    mkdir -p $out/public
    cp -r dist $out/pb_public
  '';
})
