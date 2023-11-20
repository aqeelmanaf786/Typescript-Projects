import inquirer from "inquirer";
async function account() {
    let cal = await inquirer.prompt([
        {
            name: "ATM",
            type: "list",
            choises: ["Account Management", "Balance Enquiry", "Deposit Money", "Withdraw Money", "Money transfer"]
        }
    ]);
}
