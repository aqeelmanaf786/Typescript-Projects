import inquirer from "inquirer";
import chalk from "chalk";
import {users,userPin} from "./bin/index.js"

export default async function(){
    for(let i = 0; i < users.length; i++){
        if(users[i].pin === userPin.pin){
            let money = await inquirer.prompt(
                {
                    name :"amount",
                    type : "number",
                    message :"Enter amount that you want to withdraw :"
                }
            )
            
            if(users[i].balance < money.amount){
                console.log("insufficient amount")
            }else{
                users[i].balance = users[i].balance - money.amount;
            }
        }
    }
   
    return users;
}