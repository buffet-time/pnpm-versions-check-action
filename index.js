const core = require("@actions/core");
const semver = require("semver");

try {
  // packageJson.engines.pnpm
  const massagedPnpmEngine = core.getInput("packageJson-engines-pnpm");

  // packageJson.packageManager
  const massagedPackageManager = core
    .getInput("packageJson-packageManager")
    .replace(/^(?:\w+@)?(.+)$/, '$1');

  if (semver.satisfies(massagedPackageManager, massagedPnpmEngine)) {
    console.log(`PNPM version check passed! Returning ${massagedPnpmEngine}`);
    core.setOutput("version", massagedPnpmEngine);
  } else {
    console.log(
      `PNPM version check failed! \n packageJson.engines.pnpm@${massagedPnpmEngine} & packageJson.packageManager@${massagedPackageManager} do not match!`
    );
    core.setFailed(
      "PNPM version in package.json engine.pnpm & packageManager don't match!"
    );
  }
} catch (error) {
  core.setFailed(error.message);
}
