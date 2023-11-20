import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

type Currency = {
    [i:string]:{
        [i:string]:number
    }
}
  
const currencyRates: Currency= {
    USD: { PKR: 286.62, EUR: 0.90, GBP: 0.77, SAR: 3.75 },
    PKR: { USD: 0.0034, EUR: 0.0031,GBP: 0.0027, SAR: 0.0143 },
    EUR: { PKR: 319.08, USD: 1.10, GBP: 0.86, SAR: 4.12 },
    GBP: { PKR: 368.99, USD: 1.28, EUR: 1.17,SAR :4.80},
    SAR: { PKR: 77.45,  USD :0.27, EUR: 0.24,GBP: 0.21},
  }
function sleep(){
    return new Promise((res) => {
        setTimeout(res,2000);
    })
}
async function welcome(){
    let msg = chalkAnimation.rainbow("Welcome to currency converter")
    await sleep()
    msg.stop()
}
await welcome()
async function choose(){
 let choice  = await inquirer.prompt([
        {
            name : "yourcurrency",
            type:"list",
            message:"choose your currency",
            choices:["USD","PKR","EUR","GBP","SAR"]
        },
        {
            name:"currency",
            type:"list",
            message:"choose a currency that you want to convert with your currency ",
            choices:["USD","PKR","EUR","GBP","SAR"]
        },
        {
            name: "amount",
            type: "number",
            message: "Enter amount"
        }
       
    ])
       
     
    switch(choice.yourcurrency){
        case "USD":
            let res = currencyRates[choice.yourcurrency][choice.currency] * choice.amount
            console.log(`${choice.amount} ${choice.yourcurrency} = ${res}`)
            break;
        case "PKR":
            let res1 = currencyRates[choice.yourcurrency][choice.currency] * choice.amount
            console.log(`${choice.amount} ${choice.yourcurrency} = ${res1}`)
            break;
        case "EUR":
            let res2 = currencyRates[choice.yourcurrency][choice.currency] * choice.amount
            console.log(`${choice.amount} ${choice.yourcurrency} = ${res2}`)
            break;
        case "GBP":
            let res3 = currencyRates[choice.yourcurrency][choice.currency] * choice.amount
            console.log(`${choice.amount} ${choice.yourcurrency} = ${res3}`)
            break;
        case "SAR":
            let res4 = currencyRates[choice.yourcurrency][choice.currency] * choice.amount
            console.log(`${choice.amount} ${choice.yourcurrency} = ${res4}`)
            break;
        default:
            console.log("Invaliid choice")

    }
}



async function restart(){
    do{
        await choose()
    var res = await inquirer.prompt(
        {
            name :"restartAgain",
            type:"input",
            message:"Do you want to continue y | n",
        }
    )
    }while(res.restartAgain === "y" || res.restartAgain === "Y")
}
restart()
