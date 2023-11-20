import { copyFileSync } from "fs";
import { connect } from "http2";
import inquirer from "inquirer";
import { userInfo } from "os";
import { constrainedMemory } from "process";
let enemies = ["worrier","Assasin","Scalitun","Zombie"]
let attackDamage = 50
let health = 100
let maxenemyHealth = 75
let enemyAttackDamage = 25
let numHealthPotion = 3
let healthPotionDropChance = 50
let healthPotionHealAmount = 30

let running = true

while(running){
    let enemy = enemies[Math.floor(Math.random() * enemies.length)]
    let enemyHealth = Math.floor(Math.random() * maxenemyHealth)
    console.log("The enemy ",enemy,"is apeared")
    
    let continueRunning = false
    while(enemyHealth > 1){
        console.log("Your HP ",health)
        console.log("Enemy HEalth ",enemyHealth)
        const {userChoice} = await inquirer.prompt(
            {
                name :"userChoice",
                type :"list",
                message:"What you want to do",
                choices:["Attack Enemy","Drink Health Potion","Run"]
            }
        )
        if(userChoice === "Attack Enemy"){
            let DamageDault = Math.floor(Math.random() * attackDamage)
            let DamageTaken = Math.floor(Math.random() * enemyAttackDamage)
          
            health -= DamageTaken
            enemyHealth -= DamageDault
            console.log("You Strike ",DamageDault,"damage to the enemy")
            console.log("YOu recieve",DamageTaken,"damage by the enemy")
            if(health < 1){
                console.log("You have taken too much damage, you are out");
                break;
            }
           
        }else if(userChoice === "Drink Health Potion"){
            
            if(health > 70){
                console.log("You have Enough Health");
            }else {
                if(numHealthPotion > 0){
                health += healthPotionHealAmount
                numHealthPotion--
                console.log("You Drink a health potion")
                console.log("Number of Health Potion is",numHealthPotion,"left")
            }else {
                console.log("You don't have any Health potion plz attack on enemy to get a chanve to recieve health potion")
            }

        }
    }else if(userChoice === "Run"){
        console.log("You ran away from",enemy)
        continueRunning = true
        continue;
    }
}
if(continueRunning){
    continue;
}
if(health < 0){
    console.log("Your hp is very low and enable to attack on enemy")
    break;
}
console.log(enemy,"is defeated")
console.log("Your HP ",health)
if(Math.floor(Math.random() * 100) >= healthPotionDropChance){
    console.log(enemy,"is dropped a health potion")
    numHealthPotion++
    console.log("You have ",numHealthPotion,"healtj potion left")
}
const {userChoice2} = await inquirer.prompt(
    {
        name :"userChoice2",
        type:"list",
        message:"What you want to do",
        choices:["Attack Aggain","Exit"]
    }
)
if(userChoice2 === "Attack Aggain"){
    console.log("You enter aggain in dungeon")
}else{
    console.log("You exit from dungeon")
    running = false
}
}