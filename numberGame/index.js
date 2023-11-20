import inquirer from "inquirer";
import chalkanimation from "chalk-animation";
function sleep() {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
}
async function welcome() {
    let msg = chalkanimation.rainbow("Welcome to Number Guessing Number");
    await sleep();
    msg.stop();
}
await welcome();
async function num() {
    let score = 0;
    console.log("Score", score);
    var guess = await inquirer.prompt({
        name: "numb",
        type: "number",
        message: "Enter a number between 1 to 6 :"
    });
    let comp = Math.floor(Math.random() * 6) + 1;
    console.log(`The actual number is ${comp}`);
    if (guess.numb === comp) {
        console.log("Number is true");
        score++;
        console.log(`Yor score is ${score}`);
    }
    else {
        console.log("You failed Number is incorrect");
    }
}
async function restart() {
    do {
        await num();
        var res = await inquirer.prompt({
            name: "restartAgain",
            type: "input",
            message: "Do you want to continue y | n"
        });
    } while (res.restartAgain === "y" || res.restartAgain === "Y");
}
restart();
