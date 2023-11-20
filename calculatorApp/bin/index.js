import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
function sleep() {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
}
async function welcome() {
    let msg = chalkAnimation.rainbow("Starting Calculator");
    await sleep();
    msg.stop();
    console.log(`
        |  _________________  |
    | | JO           0. | |
    | |_________________| |
    |  ___ ___ ___   ___  |
    | | 7 | 8 | 9 | | + | |
    | |___|___|___| |___| |
    | | 4 | 5 | 6 | | - | |
    | |___|___|___| |___| |
    | | 1 | 2 | 3 | | x | |
    | |___|___|___| |___| |
    | | . | 0 | = | | / | |
    | |___|___|___| |___| |
    |_____________________|
    `);
}
await welcome();
async function calculator() {
    let cal = await inquirer.prompt([
        {
            name: "operator",
            type: "list",
            message: "Which operator do you want to performe",
            choices: ["multiplication", "Addition", "Subtraction", "division"]
        },
        {
            name: "num1",
            type: "number",
            message: "Enter first number",
        },
        {
            name: "num2",
            type: "number",
            message: "Enter second number",
        }
    ]);
    if (cal.operator === "Addition") {
        console.log(chalk.bgBlue(`${cal.num1} + ${cal.num2} = ${cal.num1 + cal.num2}`));
    }
    else if (cal.operator === "multiplication") {
        console.log(chalk.bgGreen(`${cal.num1} * ${cal.num2} = ${cal.num1 * cal.num2}`));
    }
    else if (cal.operator === "division") {
        console.log(chalk.bgRed(`${cal.num1} / ${cal.num2} = ${cal.num1 / cal.num2}`));
    }
    else if (cal.operator === "subtraction") {
        console.log(chalk.bgYellow(`${cal.num1} - ${cal.num2} = ${cal.num1 - cal.num2}`));
    }
}
async function startAgain() {
    do {
        await calculator();
        var choice = await inquirer.prompt({
            name: "restart",
            type: "input",
            message: "Do you want to continue y | n"
        });
    } while ((choice.restart === "Y" || choice.restart === "y"));
}
startAgain();
