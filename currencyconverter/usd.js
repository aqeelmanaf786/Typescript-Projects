import inquirer from "inquirer";
export default async function usd() {
    let input = await inquirer.prompt({
        name: "amount",
        type: "number",
        message: "Enter amount that you want to convert"
    });
}
