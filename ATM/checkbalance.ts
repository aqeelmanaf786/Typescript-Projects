import inquirer from "inquirer";
import chalk from "chalk";
import {users,userPin} from "./bin/index.js"

export default async function checkbalance(){
    for(let i = 0; i < users.length; i++){
        if(users[i].pin === userPin.pin){
            console.log(`Your Balance is ${users[i].balance}`)
        }
    }
}