import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import chalk from "chalk";

export const appendLog = (filepath: string, data: string) =>
  new Promise<void>((resolve, reject) => {
    try {
      fs.appendFile(filepath, data, () => {
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });

export const clearLogs = () => {
  fs.rmdirSync(path.join(__dirname, "logs"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, "logs"));
};

export const spawnchildProcess = ({
  name,
  command,
  args,
}: {
  name: string;
  command: string;
  args: string[];
}) => {
  try {
    const child = spawn(command, args);

    const filepath = path.join(__dirname, `logs`, `${name}.log`);
    appendLog(filepath, `PID ${child.pid}\n`);

    child.stdout.on("data", function (data: string) {
      const filepath = path.join(__dirname, `logs`, `${name}.log`);
      appendLog(filepath, data);
    });

    child.stderr.on("data", function (data: any) {
      const filepath = path.join(__dirname, `logs`, `${name}.error.log`);
      appendLog(filepath, data);
    });

    child.on("close", function () {
      console.log(`${name} process ended.`);
    });

    console.log(`spawned ${name} process PID `, child.pid);

    return child;
  } catch (err) {
    console.log(err);
  }
};

export const runTests = () => {
  return new Promise<void>((resolve) => {
    console.log(chalk.bgGray.magenta.bold("running tests..."));
    const test = spawn("yarn", ["test:synpress"]);

    test.stdout.pipe(process.stdin);

    test.stdout.on("data", (data) => {
      const filepath = path.join(__dirname, `logs`, `test.log`);
      appendLog(filepath, JSON.stringify(data));
    });

    test.on("exit", function (data) {
      process.stdout.write(chalk.bgGray.greenBright("tests complete"));
      resolve();
    });
  });
};
