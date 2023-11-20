import inquirer from "inquirer";
import chalk from "chalk";
import {users,userPin} from "./bin/index.js"

export default async function transfer(){
    for(let i = 0; i < users.length; i++){
        if(users[i].pin === userPin.pin){
            let tran = await inquirer.prompt(
                {
                    name : "transfer",
                    type : "number",
                    message:"Enter amount you want to transfer :",
                },
            )
            if(users[i].balance < tran.transfer){
                console.log("insufficient amount")
                break;
            }else{
                users[i].balance = users[i].balance - tran.transfer;
            }
            let trans = await inquirer.prompt(
                {
                    name : "username",
                    type : "input",
                    message:"Enter the username whom you want to transfer money :"
                }
            )
            for(let j = 0; j < users.length; j++){
                if(users[i].name === trans.username){
                    users[i].balance =users[i].balance + trans.username
                    console.log(trans.username)
                }
            }
        }
    }return users;
}