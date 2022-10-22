import { clearLogs, runTests, spawnchildProcess } from "./lib";
import kill from "kill-port";

const main = async () => {
  try {
    clearLogs();

    console.log("starting local chain and server");
    const chainProcess = spawnchildProcess({
      name: "chain",
      command: "yarn",
      args: ["hardhat:dev"],
    });
    const serverProcess = spawnchildProcess({
      name: "server",
      command: "yarn",
      args: ["preview"],
    });

    console.log("running e2e tests");
    await runTests();
    console.log("tests complete");

    chainProcess.kill();

    // only way i could find to kill server for now
    kill(3001)
      .then(() => {
        console.log("tests complete :)");
        process.exit();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

main();
