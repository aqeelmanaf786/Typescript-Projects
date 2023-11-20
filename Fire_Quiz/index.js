import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import ora from "ora";
function sleep() {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
}
async function welcome() {
    let msg = chalkAnimation.rainbow("Who Wants To Be A Javascrit Millionaire");
    await sleep();
    msg.stop();
}
await welcome();
let msg1 = chalk.bgBlue("How to play");
console.log("\n", msg1, "\n", "i'm process in Your Computer.", "\n", "I you got any question wrong i will be", chalk.bgRed("killed"), "\n", "So get all the question right");
class quiz {
    name;
    constructor(name) {
        this.name = name;
    }
}
const { name1 } = await inquirer.prompt([
    {
        name: "name1",
        type: "input",
        message: "What is your name"
    }
]);
class firequiz {
    quiz = [];
    async start() {
        let startAgain = true;
        const { options } = await inquirer.prompt({
            name: "options",
            type: "list",
            message: "JavaScript war created in 10 days then released on ?",
            choices: ["May 23rd, 1995", "Nov 24th, 1995", "Dec 4th, 1995", "Dec 17th, 1996"]
        });
        if (options === "Dec 4th, 1995") {
            const oraa = ora("Checking answer").start();
            await sleep();
            oraa.stop();
            console.log("Nice Work", name1, ".That's a legit answer");
            const { varx } = await inquirer.prompt({
                name: "varx",
                type: "list",
                message: "What is x? var x = 1_1 + '1' + Number(1)",
                choices: ["4", "'4'", "'1111'", "69420"]
            });
            if (varx === "'1111'") {
                const oraa = ora("Checking answer").start();
                await sleep();
                oraa.stop();
                console.log("Nice Work", name1, ".That's a legit answer");
                const { firstelement } = await inquirer.prompt({
                    name: "firstelement",
                    type: "list",
                    message: "What is the irst element in the array?  ['🐏', '🦙', '🐍'].length = 0",
                    choices: ["0", "🐏", "🐍", "undefined"]
                });
                if (firstelement === "undefined") {
                    const oraa = ora("Checking answer").start();
                    await sleep();
                    oraa.stop();
                    console.log("Nice Work", name1, ".That's a legit answer");
                    const { permitive } = await inquirer.prompt({
                        name: "permitive",
                        type: "list",
                        message: "Which of the following is NOT a primitive type?",
                        choices: ["boolean", "number", "null", "object"]
                    });
                    if (permitive === "object") {
                        const oraa = ora("Checking answer").start();
                        await sleep();
                        oraa.stop();
                        console.log("Nice Work", name1, ".That's a legit answer");
                        const { jslanguage } = await inquirer.prompt({
                            name: "jslanguage",
                            type: "list",
                            message: " JS is a high-level single-threaded, garbage-collected,interpreted(or just-in-time compiled), prototype-based,multi-paradigm, dynamic language with a ____ event loop",
                            choices: ["multi-threaded", "non-blocking", "synchronous", "promise-based"]
                        });
                        if (jslanguage === "non-blocking") {
                            const oraa = ora("Checking answer").start();
                            await sleep();
                            oraa.stop();
                            console.log("Nice Work", name1, ".That's a legit answer");
                            figlet("Congrats " + name1 + "\n" + "$100,000,000", function (err, data) {
                                if (err) {
                                    console.log("Something went wrong...");
                                    console.dir(err);
                                    return;
                                }
                                if (data) {
                                    let message = chalkAnimation.rainbow(data);
                                    setTimeout(() => {
                                        message.stop();
                                    }, 2000);
                                }
                            });
                        }
                        else {
                            const oraa = ora("Checking answer").start();
                            await sleep();
                            oraa.stop();
                            console.log("Game Over. You Lose", name1);
                            startAgain = false;
                        }
                    }
                    else {
                        const oraa = ora("Checking answer").start();
                        await sleep();
                        oraa.stop();
                        console.log("Game Over. You Lose", name1);
                        startAgain = false;
                    }
                }
                else {
                    const oraa = ora("Checking answer").start();
                    await sleep();
                    oraa.stop();
                    console.log("Game Over. You Lose", name1);
                    startAgain = false;
                }
            }
            else {
                const oraa = ora("Checking answer").start();
                await sleep();
                oraa.stop();
                console.log("Game Over. You Lose", name1);
                startAgain = false;
            }
        }
        else {
            const oraa = ora("Checking answer").start();
            await sleep();
            oraa.stop();
            console.log("Game Over. You Lose", name1);
            startAgain = false;
        }
    }
}
let fire = new firequiz();
fire.start();
