import arg from "arg";
import { createRobot } from "./main";
import chalk from 'chalk';

function perseArugumentIntoOptions(rawArgs) {

    const args = arg({
        '--config': Boolean,
        '--robot': Boolean,
        '-c': '--config',
        '-r': '--robot'
    },
        {
            argv: rawArgs.slice(2)
        }
    )

    return {
        generateConfig: args["--config"] || false,
        generateRobot: args["--robot"] || false
    }
}

function promptForMissingOptions() {

    console.log(chalk.red("missing arguments"))
    console.log(chalk.blueBright("options:"))
    console.log(" --config, -c      Generate config file")
    console.log(" --robot, -r   Generate robots file");
}

export async function cli(args) {
    let options = perseArugumentIntoOptions(args)

    if (!options.generateConfig && !options.generateRobot) {
        options = promptForMissingOptions()
    } else {
        createRobot(options)
    }
}