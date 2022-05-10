const chalk = require('chalk');

module.exports = {
    red: (text) => chalk(chalk.red(text)),
    blue: (text) => chalk(chalk.blue(text)),
}