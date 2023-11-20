import inquirer from "inquirer";
import chalk from "chalk";
import {users,userPin} from "./bin/index.js"

export default async function deposit(){
    for(let i = 0; i < users.length; i++){
        if(users[i].pin === userPin.pin){
            let depo = await inquirer.prompt(
                {
                    name : "dep",
                    type : "number",
                    message: "Enter amount that you want to deposit :"
                }
                
            ) 
            users[i].balance += depo.dep
        }
    }
    return users;
}