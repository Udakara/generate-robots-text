import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);
const cwd = process.cwd()

async function copyConfigFiles(templateDirectory) {
  return copy(templateDirectory, cwd + '/robot-txt.config.js', {
    clobber: false,
  });
}

async function generateRobotFile() {

  if (!fs.existsSync(cwd + '/robot-txt.config.js')) {
    console.log(chalk.red("No config file found."))
    console.log("make sure you generate config file before create robot file")
    console.log(chalk.blue("options:"))
    console.log(" --config, -c      Generate config file")
    process.exit(1)
  }
  const robotConfigs = require(cwd+'/robot-txt.config.js')

  if(robotConfigs.destinationPath == ""){
    console.log(chalk.redBright("destination Path is empty"))
    process.exit(1)
  }
  
  const destinationPath = cwd+robotConfigs.destinationPath+"/robots.txt";
  const userAgent = robotConfigs.policy.userAgent;
  const disallow = robotConfigs.policy.disallow;
  const allow = robotConfigs.policy.allow;


  var robotTxt = fs.createWriteStream(destinationPath, {
    flags: "w",
  });


  robotTxt.write("User-agent:"+userAgent+"\n")
  disallow.forEach((item,index) => {
    robotTxt.write("Disallow:"+item+"\n")
  })
  allow.forEach((item,index) => {
    robotTxt.write("Allow:"+item+"\n") 
  })

  robotTxt.end()

  console.log(chalk.greenBright.bold("DONE"))
  
}


export async function createRobot(options) {

  let currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../templates/robot-txt.config.js'
  );

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(err, chalk.red.bold('ERROR'));
    process.exit(1);
  }

  if (options.generateConfig) {
    await copyConfigFiles(templateDir);
    console.log(chalk.green.bold("Done"));
  }
  if (options.generateRobot) {
    await generateRobotFile()
  }


}