#! /usr/bin/env node
import inquirer from 'inquirer';
class Admin {
    name;
    pin;
    constructor(name, pin) {
        this.name = name;
        this.pin = pin;
    }
}
let admin = new Admin("Adeel", 1111);
class BankAccount {
    balance = 100;
    async deposit() {
        const { amount } = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: 'Enter amount to deposit'
        });
        if (amount > 0) {
            this.balance += amount;
            console.log(`${amount} Amount is successfully deposited into your account`);
            console.log(`Your new balance is ${this.balance}`);
        }
        else {
            console.log("Please enter amount greater than 0");
        }
    }
    async withdraw() {
        const { amount } = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: 'Enter amount to withdraw'
        });
        if (amount <= this.balance) {
            if (amount > 100) {
                this.balance -= (amount + 1);
            }
            else {
                this.balance -= amount;
            }
        }
        else {
            console.log("You have insufficient amount");
        }
    }
}
class Customer {
    name;
    gender;
    age;
    pin;
    bankAccount = new BankAccount();
    constructor(name, gender, age, pin) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.pin = pin;
    }
}
class MyBank {
    customers = [new Customer("Aqeel Manaf", "Male", 19, 8888)];
    async start() {
        let startAgain = true;
        while (startAgain) {
            let { options } = await inquirer.prompt({
                name: "options",
                type: 'list',
                message: "Select an option",
                choices: ["user", "admin"],
            });
            if (options === "user") {
                let startAgain2 = true;
                let customerNames = this.customers.map(customer => customer.name);
                let { selectedCustomerName } = await inquirer.prompt({
                    name: 'selectedCustomerName',
                    type: "list",
                    message: "Select your name",
                    choices: customerNames
                });
                let { selectedCustomerPin } = await inquirer.prompt({
                    name: "selectedCustomerPin",
                    type: "number",
                    message: "Enter your pin"
                });
                let selectedCustomer = this.customers.find(customer => selectedCustomerName === customer.name);
                while (startAgain2) {
                    if (selectedCustomer?.pin === selectedCustomerPin) {
                        let { customerOptions } = await inquirer.prompt({
                            name: "customerOptions",
                            type: "list",
                            message: "Select an option",
                            choices: ['Check Balance', 'Deposite', 'WithDraw', 'ChangePin', 'Exit']
                        });
                        switch (customerOptions) {
                            case "Check Balance":
                                console.log(`Your Balance is ${selectedCustomer?.bankAccount.balance}`);
                                break;
                            case "Deposite":
                                await selectedCustomer?.bankAccount.deposit();
                                break;
                            case "WithDraw":
                                await selectedCustomer?.bankAccount.withdraw();
                                break;
                            case "ChangePin":
                                let { newPin } = await inquirer.prompt({
                                    name: 'newPin',
                                    type: 'number',
                                    message: 'Enter your new pin'
                                });
                                for (let i = 0; i < this.customers.length; i++) {
                                    if (this.customers[i].name === selectedCustomer?.name) {
                                        this.customers[i].pin = newPin;
                                        startAgain2 = false;
                                        break;
                                    }
                                }
                                break;
                            case "Exit":
                                startAgain2 = false;
                                break;
                        }
                    }
                    else {
                        console.log("Invalid pin");
                    }
                }
            }
            else {
                let startAgain3 = true;
                while (startAgain3) {
                    let { adminOptions } = await inquirer.prompt({
                        name: 'adminOptions',
                        type: 'list',
                        message: 'Select an option',
                        choices: ["Add Customer", "Check Customers", "Exit"],
                    });
                    switch (adminOptions) {
                        case "Add Customer":
                            let { name, gender, age, pin } = await inquirer.prompt([{
                                    name: "name",
                                    type: "input",
                                    message: 'Enter customer name',
                                },
                                {
                                    name: "gender",
                                    type: "input",
                                    message: "Enter customer gender"
                                },
                                {
                                    name: 'age',
                                    type: 'number',
                                    message: 'Enter customer age'
                                },
                                {
                                    name: 'pin',
                                    type: 'number',
                                    message: 'Enter customer pin'
                                }
                            ]);
                            this.customers.push(new Customer(name, gender, age, pin));
                            break;
                        case "Check Customers":
                            let customerNames = this.customers.map(c => c.name);
                            console.log(customerNames);
                            break;
                        case "Exit":
                            startAgain3 = false;
                    }
                }
            }
        }
    }
}
let bank = new MyBank();
bank.start();
