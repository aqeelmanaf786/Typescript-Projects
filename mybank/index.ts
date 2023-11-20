// import readLine from "readline";
import chalk from "chalk";
import inquirer from "inquirer";
// import { secureHeapUsed } from "crypto";

// let rl = readLine.createInterface({
//     input :process.stdin,
//     output :process.stdout
// })
// rl.question("Enter time in second", (second) => {
//     let Timeleft  = parseInt(second)
//     const timeleft = setInterval(() => {
//         console.clear()
//         console.log("Time left, ",Timeleft)
//         Timeleft--
//         if(Timeleft < 0){
//             console.log("Time is up")
//             clearInterval(timeleft)
//             rl.close()
//         }
//     },1000)

// })

class User {
    name :string
    gender:string
    age :number
    pin:number
    Balance = 100

    constructor(name :string,gender:string,age:number,pin:number){
        this.name = name
        this.gender = gender
        this.age = age
        this.pin = pin
    }
}
class  admin {
    name :string
    pin : number


    constructor(name:string,pin:number){
        this.name = name
        this.pin = pin
    }
}


 class myBank {
    user : User[] = []
    
    async start(){
        let startaggain = true
        while(startaggain){
        const {userchoise} = await inquirer.prompt(
            {
                name :'userchoise',
                type :"list",
                message:'Select an option',
                choices:["User","Admin"]
            }
        )
        if(userchoise === "Admin"){
            let startaggain2 =true
            while(startaggain2){
                const {userchoise} = await inquirer.prompt([
                    {
                        name : "userchoise",
                        type:"list",
                        message:"select an option",
                        choices:["Add Customer","CHeck Customer","Exit"]
                    }
                ]) 
                if(userchoise === "Add Customer"){
            const {name,gender,age,pin} = await inquirer.prompt([
                {
                    name : "name",
                    type: "input",
                    message:"Enter customer name :"
                },
                {
                    name :"gender",
                    type:"list",
                    message :"Enter customer gender",
                    choices :["Male","Female","Custom"]

                },
                {
                    name :"age",
                    type:"number",
                    message:"Enter customer age"
                },
                {
                    name :"pin",
                    type:"number",
                    message:"Enter Coustomer pin"
                },
            ])
            this.user.push(new User(name,gender,age,pin))
            console.log(this.user)
        }else if(userchoise === "CHeck Customer"){
            let use = this.user.map(u => u.name)
            console.log(use)
    }
    else if(userchoise === "Exit"){
        startaggain2 = false
        break;
    }
    }
}else if(userchoise === "User"){
   
    let usernames = this.user.map(u => u.name)
    let {username} = await inquirer.prompt(
        {
            name :"username",
            type:"list",
            message:"select user name",
            choices :usernames
        }
    )
    const selecteduser = this.user.find(u => u.name === username)
    console.log(selecteduser)
    const {Pin} = await inquirer.prompt(
        {
            name : "Pin",
            type:"number",
            message:"Enter your pin"
        }
    )
    if(selecteduser?.pin === Pin){
        let startaggain3 = true
        while(startaggain3){
        const{option} = await inquirer.prompt([
            {
                name :"option",
                type:"list",
                message:"Select an option",
                choices :["Check Balance","Deposite","Withdraw","ChangePin","Exit"]
            }
        ])
        if(option === "Check Balance"){
           
            console.log("Your balance is",selecteduser?.Balance)
        }else if(option === "Deposite"){
            const {dep} = await inquirer.prompt(
                {
                    name :"dep",
                    type:"number",
                    message:"Enter Amount that you want to deposit"
                }
            )
            if(selecteduser){
            selecteduser.Balance += dep    
            }        
        }else if (option === "Withdraw"){
            if(selecteduser){
            if(selecteduser?.Balance > 0){
                const {amount} = await inquirer.prompt(
                    {
                        name :"amount",
                        type:"number",
                        message:"Enter amount that you want to withdraw"
                    }
                )
                if(amount < selecteduser.Balance){
                    if(amount > 100){
                        selecteduser.Balance -= amount + 1
                        console.log(amount)
                    }else {
                       selecteduser.Balance -= amount
                    }
                }else{
                    console.log("insufficient amount")
                }
               
               }
            }
             }else if(option === "Exit"){
                startaggain3 = false
                break
             }else if(option === "ChangePin"){
                const {pin} = await inquirer.prompt(
                    {
                        name : "pin",
                        type:"number",
                        message:"Enter new pin"
                    }
                )
                    if(selecteduser){
                        selecteduser.pin = pin
                        startaggain3 = false
                        break;
                    }
                }
             }
           }else{
            console.log("invalid pin")
            startaggain = false
            break
           }
          }
         }
       } 
    } 


 let my = new myBank()
 my.start()