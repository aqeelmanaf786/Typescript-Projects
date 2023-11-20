import inquirer from "inquirer";
import fs from 'fs';
class toDoList {
    description;
    dueDate;
    priority;
    status;
    constructor(descripton, dueDate, priority, status) {
        this.description = descripton;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }
}
class todo {
    todolist = [];
    async start() {
        let startAgain = true;
        if (fs.existsSync('todo.json')) {
            const rawData = fs.readFileSync('todo.json', 'utf8');
            const data = JSON.parse(rawData);
            this.todolist = data.todos.map((t) => Object.assign(new toDoList('', '', '', ''), t));
        }
        while (startAgain) {
            const { options } = await inquirer.prompt([
                {
                    name: "options",
                    type: "list",
                    message: "What you want to do?",
                    choices: ["View To Do list", "Add new Task", "Edit Task",
                        "Mark Task As complete", "Delete Task", "Filter Task", "Search Task", "Exit"]
                }
            ]);
            switch (options) {
                case "View To Do list":
                    await this.viewtodolist();
                    break;
                case "Add new Task":
                    await this.addnewTask();
                    break;
                case "Edit Task":
                    await this.editTask();
                    break;
                case "Mark Task As complete":
                    await this.markTaskAsComplete();
                    break;
                case "Delete Task":
                    await this.deleteFunction();
                    break;
                case "Filter Task":
                    await this.filterTask();
                    break;
                case "Search Task":
                    await this.searchTask();
                    break;
                case "Exit":
                    startAgain = false;
                    const data = {
                        todos: this.todolist,
                    };
                    fs.writeFileSync('todo.json', JSON.stringify(data), 'utf8');
                    break;
            }
        }
    }
    async viewtodolist() {
        for (let todo of this.todolist) {
            console.log("Description : ", todo.description, "\n", "Due Date : ", todo.dueDate, "\n", "Priority : ", todo.priority, "\n", "Status : ", todo.status);
        }
    }
    async addnewTask() {
        const { description, dueDate, priority, status } = await inquirer.prompt([
            {
                name: "description",
                type: "input",
                message: "Enter description of To Do",
            },
            {
                name: "dueDate",
                type: "string",
                message: "Enter Due Date",
            },
            {
                name: "priority",
                type: "list",
                message: "Slect priority of To Do",
                choices: ["High", "Low", "Medium"]
            },
            {
                name: "status",
                type: "list",
                message: "Select status of To Do",
                choices: ["Pending", "Completed"]
            }
        ]);
        let task = new toDoList(description, dueDate, priority, status);
        this.todolist.push(task);
    }
    async editTask() {
        const TaskNames = this.todolist.map(toDoList => toDoList.description);
        const { TaskName, description, dueDate, priority, status } = await inquirer.prompt([
            {
                name: "TaskName",
                type: "list",
                message: "Select a task name",
                choices: TaskNames
            },
            {
                name: "description",
                type: "input",
                message: "Enter new Description of To Do :"
            },
            {
                name: "dueDate",
                type: "input",
                message: "Enter new DueDate :"
            },
            {
                name: "priority",
                type: "list",
                message: "select priority of To Do",
                choices: ["High", "Low", "Medium"]
            },
            {
                name: "status",
                type: 'list',
                message: "Select status of To Do",
                choices: ["Completed", "Pending"]
            }
        ]);
        const selectedTask = this.todolist.find(toDoList => toDoList.description === TaskName);
        if (selectedTask) {
            selectedTask.description = description;
            selectedTask.dueDate = dueDate;
            selectedTask.priority = priority;
            selectedTask.status = status;
        }
    }
    async deleteFunction() {
        const TaskNames = this.todolist.map(toDoList => toDoList.description);
        const { TaskName } = await inquirer.prompt([
            {
                name: "TaskName",
                type: "list",
                message: 'Select name of task',
                choices: TaskNames
            }
        ]);
        const selectedTask = this.todolist.find(toDoList => toDoList.description === TaskName);
        if (selectedTask) {
            let ind = this.todolist.indexOf(selectedTask);
            this.todolist.splice(ind, 1);
        }
    }
    async searchTask() {
        const TaskNames = this.todolist.map(toDoList => toDoList.description);
        const { TaskName } = await inquirer.prompt([
            {
                name: "TaskName",
                type: "list",
                message: "Select Task Name",
                choices: TaskNames
            }
        ]);
        const selectedTask = this.todolist.find(toDoList => toDoList.description === TaskName);
        console.log("Description :", selectedTask?.description, "\n", "Due Date :", selectedTask?.dueDate, "\n", "Priority :", selectedTask?.priority, "\n", "Status :", selectedTask?.status);
    }
    async filterTask() {
        const { TaskName } = await inquirer.prompt([
            {
                name: "TaskName",
                type: "list",
                message: "Select status of To Do",
                choices: ["High", "Medium", "Low"],
            },
        ]);
        const selectedTask = this.todolist.filter(toDoList => toDoList.priority === TaskName);
        for (const task of selectedTask) {
            console.log("Description:", task.description);
            console.log("Due Date:", task.dueDate);
            console.log("Priority:", task.priority);
            console.log("Status:", task.status);
        }
    }
    async markTaskAsComplete() {
        const pendingTasks = this.todolist.filter(task => task.status === "Pending");
        const TaskNames = pendingTasks.map(toDoList => toDoList.description);
        const { TaskName } = await inquirer.prompt([
            {
                name: "TaskName",
                type: "list",
                message: "Select name of To Do",
                choices: TaskNames
            }
        ]);
        const selectedTask = this.todolist.find(toDoList => toDoList.description === TaskName);
        if (selectedTask) {
            selectedTask.status = "completed";
        }
    }
}
let t = new todo();
t.start();
