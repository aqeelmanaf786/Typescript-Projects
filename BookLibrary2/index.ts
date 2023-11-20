
import fs from "fs"
import inquirer from "inquirer"
import { availableParallelism } from "os"


class Books{
    title : string
    author : string
    availableCopies : number



    constructor(title:string,author:string,availableCopies:number){
        this.title = title
        this.author = author
        this.availableCopies = availableCopies
    }
    getTitle(){
        return this.title
    }

    getAuthor(){
        return this.author
    }

    getAvailableCopies(){
        return this.availableCopies
    }
    borrowBook(): void{
        if(this.availableCopies > 0){
            this.availableCopies--
            console.log(`Book ${this.title} is borrow`)
        }else{
            console.log(`Book ${this.title} is not borrow`)
        }
    }

}

class User{
    name : string;
    borrowBooks :number;


    constructor(name:string,borrowBooks : number){
        this.name = name
        this.borrowBooks = borrowBooks
    }

    getName(){
        return this.name
    }

    getBorrowBooks(){
        return this.borrowBooks
    }

    borrowBook(){
        if(this.borrowBooks < 10){
            this.borrowBooks++;
            console.log(`${this.name} is boorow`)
        }else {
            console.log(`you  have reached maximum limit`)
        }
    }
}
class Librarian extends User{
    employeeId : number
    books :Books[] = []

    constructor(name: string ,borrowBooks: number, employeeId : number){
        super(name,borrowBooks)
        this.employeeId = employeeId
    }

    getEmployeeId(){
        return this.employeeId
    }

}

function getNameFromOBject(objs:any){
    let arr = objs.map((obj:any) => obj.title)
    return arr
}

function getObjectFromName(objs:any,name : string){
    let obj = objs.find((obj :any) => obj.title === name);
    return obj
}


function getObjectFromNames(objs:any,name : string){
    let obj = objs.find((obj :any) => obj.name === name);
    return obj
}



class Library{
    books : Books[] = []
    users : User[] =[]
    librarian : Librarian[] = []
    async start (){
        let startAgain = true
        while(startAgain){
            const {options} = await inquirer.prompt([
                {
                    name : "options",
                    type : "list",
                    message : "Select one option",
                    choices : ["Add Book","Add User","Delete Book","Display Book","BorrowBook","Exit"]
                }
            ])
            switch(options){
                case "Add Book":
                    await this.addBook();
                    break;
                case "Add User":
                    await this.addUser();
                    break;
                case "Delete Book":
                    await this.deleteBook();
                    break;
                case "Display Book":
                    await this.displayBook();
                    break;
                case "BorrowBook":
                    await this.borrowBooks()
                    break;
                case "Exit":
                    startAgain = false
                    break;
            }
        }

    }

    async addBook(){
        const {Book,author,copies} = await inquirer.prompt([
            {
                name : "Book",
                type : 'input',
                message : "Enter Book Name"
            },
            {
                name : "author",
                type:"input",
                message:"Enter Author name"
            },
            {
                name :"copies",
                type:"number",
                message:"Enter number of Copies"
            }
        ])
        let book = new Books(Book,author,copies)
        this.books.push(book)
    }
    async addUser(){
        const{userName,borrowBooks} = await inquirer.prompt([
            {
                name : "userName",
                type : "input",
                message:"Enter User Name",
            },
            {
                name : "borrowBooks",
                type: "number",
                message : "Enter Number of borrowBooks"
            }
        ])
        let user  = new User(userName,borrowBooks)
        this.users.push(user)
    }
    async displayBook(){
        for(let book of this.books){
            console.log("Book Name : ",book.title,"\n",
            "Book Author Name : ",book.author,"\n",
            "Book Copies : ",book.availableCopies)
        }
    }

  async deleteBook(){
    const bookNames = getNameFromOBject(this.books);
    const {bookName} = await inquirer.prompt(
        {
            name : "bookName",
            type : "list",
            message : 'Select book name',
            choices : bookNames
        }
    )
    const selectedBook = getObjectFromName(this.books,bookName )
    let ind = this.books.indexOf(selectedBook)
    this.books.splice(ind,1)

    }

    async borrowBooks(){
        const userNames  = this.users.map(user => user.name)
        const {userName} = await inquirer.prompt([
            {
                name :"userName",
                type:"list",
                message : "Select user name",
                choices: userNames
            }
        ])
        const selectedUser :User =  getObjectFromNames(this.users,userName)
        const bookNames = getNameFromOBject(this.books)
        const {bookName} = await inquirer.prompt([
            {
                name : 'bookName',
                type:"list",
                message:"Select book name",
                choices:bookNames
            }
        ])
        const selectedBook:Books = getObjectFromName(this.books,bookName)
        console.log(selectedBook)
        console.log(selectedUser)
        if(selectedBook?.availableCopies > 0 && selectedUser?.borrowBooks < 10){
            selectedBook.availableCopies--;
            selectedUser.borrowBooks++;
            console.log(`${selectedBook.title} is borrowed by ${selectedUser.name}`)
        }
        else{
            console.log("A book is not found or user reached maximum limit")
        }
    }

    
}
let l  = new Library()
l.start()

