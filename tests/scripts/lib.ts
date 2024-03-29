import chalk from 'chalk';
import { spawn } from 'child_process';
import fs, { promises as fsPromises } from 'fs';
import path from 'path';

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

export const clearLogs = async () => {
  const logsDir = path.join(__dirname, 'logs');
  try {
    // throws if directory doesn't exist
    await fsPromises.access(logsDir);
    fs.rmdirSync(logsDir, { recursive: true });
    fs.mkdirSync(logsDir);
  } catch (err) {
    fs.mkdirSync(logsDir);
  }
};

export const spawnchildProcess = ({
  name,
  command,
  args
}: {
  name: string;
  command: string;
  args: string[];
}) => {
  try {
    const child = spawn(command, args);

    const pidFilepath = path.join(__dirname, `logs`, `${name}.log`);
    appendLog(pidFilepath, `PID ${child.pid}\n`);

    child.stdout.on('data', (data: string) => {
      const filepath = path.join(__dirname, `logs`, `${name}.log`);
      appendLog(filepath, data);
    });

    child.stderr.on('data', (data: any) => {
      const filepath = path.join(__dirname, `logs`, `${name}.error.log`);
      appendLog(filepath, data);
    });

    child.on('close', () => {
      console.log(`${name} process ended.`);
    });

    console.log(`spawned ${name} process PID `, child.pid);

    return child;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const runTests = () =>
  new Promise<void>((resolve) => {
    console.log(chalk.bgGray.magenta.bold('running tests...'));
    const test = spawn('yarn', ['test:synpress']);

    test.stdout.pipe(process.stdin);

    test.stdout.on('data', (data) => {
      const filepath = path.join(__dirname, `logs`, `test.log`);
      appendLog(filepath, JSON.stringify(data));
    });

    test.on('exit', () => {
      process.stdout.write(chalk.bgGray.greenBright('tests complete'));
      resolve();
    });
  });
