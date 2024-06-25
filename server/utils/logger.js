import chalk from "chalk";

export const successLog = (message) => {
  console.log(chalk.bgGreen.bold("✓ Success: "), message);
};

export const errorLog = (message) => {
  console.log(chalk.bgRed.bold("✘ Error: "), message);
};
