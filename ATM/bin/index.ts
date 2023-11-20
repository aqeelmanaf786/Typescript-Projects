import chalk from "chalk";

import chalkAnimation from "chalk-animation";

import inquirer from "inquirer";
import checkbalance from "../checkbalance.js";
import withdraw from "../withdraw.js"; 
import deposit from "../deposit.js";
import transfer from "../transfer.js";
export let users  = [
    {
        name : "Aqeel",
        pin : 1111,
        balance: 10000
    },
    {
        name : "Adeel",
        pin : 2222,
        balance: 9000
    },
    {
        name : "Ali",
        pin : 3333,
        balance: 8000
    },
    {
        name : "Zain",
        pin : 4444,
        balance: 7000
    },
    {
        name : "Zohaib",
        pin : 5555,
        balance: 6000
    },
]


function sleep(){
    return new Promise((res) => {
        setTimeout(res, 2000);
    })
}

async function welcome(){
    let msg = chalkAnimation.rainbow("Welcome to ATM")
    await sleep();
    msg.stop()

}
await welcome()
   export 
    let userPin = await inquirer.prompt([
        {
            name : "pin",
            type: "number",
            message: "Enter 4 digit pin",
     }
    ])
        var flag = false;
        for(let i = 0; i < users.length; i++){
            if(users[i].pin === userPin.pin){
                flag = true
            }
        }
        if(!flag){
            console.log("Invalid pin");
        }
        else{
               do{
                let opt = await inquirer.prompt([
                    {
                        name : "option",
                        type : "list",
                        message: "Select one option",
                        choices: ["Check balance","Withdraw","Deposit","Transfer"],
                    }
                   ])
                   switch(opt.option){
                    case "Check balance":
                        checkbalance()
                        break;
                    case "Withdraw":
                        await withdraw()
                        break;
                    case "Deposit":
                        await deposit()
                        break;
                    case "Transfer":
                        await transfer(

                        )
                        break;
                   }

                   var restart = await inquirer.prompt({
                    type: "input",
                    name: "res",
                    message: "Do you want to continue, y | n"
                   })
               }while(restart.res === "Y" || restart.res === "y")
            } 
        

            


    
