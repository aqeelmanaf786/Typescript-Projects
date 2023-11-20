import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import fs from "fs";
function sleep() {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
}
async function welcome() {
    let msg = chalkAnimation.rainbow("welcome to University Management System");
    await sleep();
    msg.stop();
}
await welcome();
class Course {
    name;
    courseId;
    students = [];
    teachers = [];
    departments = [];
    constructor(courseId, name) {
        this.courseId = courseId;
        this.name = name;
    }
    addStudent(rollNumber) {
        this.students.push(rollNumber);
    }
    assignTeacher(teacherId) {
        this.teachers.push(teacherId);
    }
    addDepartment(departmentId) {
        this.departments.push(departmentId);
    }
}
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}
class Department {
    name;
    deparmentId;
    courses = [];
    constructor(name, departmentId) {
        this.name = name;
        this.deparmentId = departmentId;
    }
    addCourse(courseId) {
        this.courses.push(courseId);
    }
}
function getNameFromOBject(objs) {
    let arr = objs.map((obj) => obj.name);
    return arr;
}
function getObjectFromName(objs, name) {
    let obj = objs.find((obj) => obj.name === name);
    return obj;
}
class Student extends Person {
    rollNumber;
    courses = [];
    constructor(name, age, rollNumber) {
        super(name, age);
        this.rollNumber = rollNumber;
    }
    async registerForCourse(courseId) {
        this.courses.push(courseId);
    }
}
class Teacher extends Person {
    salary;
    teacherId;
    courses = [];
    constructor(name, age, salary, teacherId) {
        super(name, age);
        this.salary = salary;
        this.teacherId = teacherId;
    }
    assignCourse(courseId) {
        this.courses.push(courseId);
    }
}
class studentManagementSystem {
    courses = [];
    students = [];
    teachers = [];
    departments = [];
    async start() {
        let startAgain = true;
        if (fs.existsSync('sms_data.json')) {
            const rawData = fs.readFileSync('sms_data.json', 'utf8');
            const data = JSON.parse(rawData);
            this.students = data.students.map((student) => Object.assign(new Student('', 0, 0), student));
            this.courses = data.courses.map((course) => Object.assign(new Course(0, ''), course));
            this.teachers = data.teachers.map((teacher) => Object.assign(new Teacher('', 0, 0, 0), teacher));
            this.departments = data.departments.map((department) => Object.assign(new Department('', 0), department));
        }
        while (startAgain) {
            const { options } = await inquirer.prompt({
                name: "options",
                type: "list",
                message: "Select one option",
                choices: ["Add Student", "Add Course", "Add Teacher", "Add Department",
                    "Register Student In Course", "Assign Course To Teacher", "Add Course To Deparment",
                    "Display Student", "Display Course", "Display Teacher", "Display Department", "Exit"]
            });
            switch (options) {
                case "Add Student":
                    await this.addStudent();
                    break;
                case "Add Course":
                    await this.addCourse();
                    break;
                case "Add Teacher":
                    await this.addTeacher();
                    break;
                case "Add Department":
                    await this.addDeparment();
                    break;
                case "Register Student In Course":
                    await this.registerStudentInCourse();
                    break;
                case "Assign Course To Teacher":
                    await this.assignCourseToTeacher();
                    break;
                case "Add Course To Deparment":
                    await this.addCourseToDepartment();
                    break;
                case "Display Student":
                    await this.displayStudents();
                    break;
                case "Display Course":
                    await this.displayCourses();
                    break;
                case "Display Teacher":
                    await this.displayTeacherDetails();
                    break;
                case "Display Department":
                    await this.displayDepartment();
                    break;
                case "Exit":
                    startAgain = false;
                    const data = {
                        students: this.students,
                        courses: this.courses,
                        teachers: this.teachers,
                        departments: this.departments
                    };
                    fs.writeFileSync('sms_data.json', JSON.stringify(data), 'utf8');
                    break;
            }
        }
    }
    async addStudent() {
        const { name, age, rollNumber } = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter student name : ",
            },
            {
                name: "age",
                type: 'number',
                message: 'Enter student age:',
            },
            {
                name: "rollNumber",
                type: "number",
                message: "Enter Student roll number ",
            }
        ]);
        let s = new Student(name, age, rollNumber);
        this.students.push(s);
    }
    async addTeacher() {
        const { name, age, salary, id } = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter Teacher name : ",
            },
            {
                name: "age",
                type: 'number',
                message: 'Enter Teaacher age:',
            },
            {
                name: "salary",
                type: "number",
                message: "Enter teacher salary: ",
            },
            {
                name: "id",
                type: "number",
                message: "Enter teacher id:"
            }
        ]);
        let t = new Teacher(name, age, salary, id);
        this.teachers.push(t);
    }
    async addDeparment() {
        const { name, id } = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter department name : ",
            },
            {
                name: "id",
                type: 'number',
                message: 'Enter deparment id:',
            },
        ]);
        let d = new Department(name, id);
        this.departments.push(d);
    }
    async addCourse() {
        const { name, id } = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter Course name : ",
            },
            {
                name: "id",
                type: 'number',
                message: 'Enter course id:',
            },
        ]);
        let c = new Course(id, name);
        this.courses.push(c);
    }
    async registerStudentInCourse() {
        const studentNames = this.students.map(Student => Student.name);
        const { studentName } = await inquirer.prompt([
            {
                name: "studentName",
                type: "list",
                message: 'Selct student name',
                choices: studentNames
            }
        ]);
        const selectedStudent = getObjectFromName(this.students, studentName);
        const CourseNames = getNameFromOBject(this.courses);
        const { CourseName } = await inquirer.prompt({
            name: "CourseName",
            type: "list",
            message: "select course name",
            choices: CourseNames
        });
        const selectedCourse = getObjectFromName(this.courses, CourseName);
        if (selectedCourse && selectedStudent) {
            selectedCourse.addStudent(selectedStudent.rollNumber);
            selectedStudent.registerForCourse(selectedCourse.courseId);
        }
        else {
            console.log("Student or Course are not found");
        }
    }
    async assignCourseToTeacher() {
        const courseNames = getNameFromOBject(this.courses);
        const { selectedCourseName } = await inquirer.prompt({
            name: 'selectedCourseName',
            type: "list",
            message: "Select course Name",
            choices: courseNames,
        });
        const selectedCourse = getObjectFromName(this.courses, selectedCourseName);
        const teacherNames = getNameFromOBject(this.teachers);
        const { selectedTeacherName } = await inquirer.prompt({
            name: "selectedTeacherName",
            type: "list",
            message: "slect teacher name",
            choices: teacherNames
        });
        const selectedTeacher = getObjectFromName(this.teachers, selectedTeacherName);
        if (selectedCourse && selectedTeacher) {
            selectedCourse.assignTeacher(selectedTeacher.teacherId);
            selectedTeacher.assignCourse(selectedCourse.courseId);
            console.log(`${selectedCourseName} is successfully assigned to ${selectedTeacherName}`);
        }
        else {
            console.log("Teacher or Course are invalid");
        }
    }
    async addCourseToDepartment() {
        const courseNames = getNameFromOBject(this.courses);
        const { courseName } = await inquirer.prompt({
            name: "courseName",
            type: "list",
            message: 'select course name',
            choices: courseNames
        });
        const selectedCourse = getObjectFromName(this.courses, courseName);
        const deparmentNames = getNameFromOBject(this.departments);
        const { departmentName } = await inquirer.prompt({
            name: "departmentName",
            type: "list",
            message: "Select department name",
            choices: deparmentNames
        });
        const selectedDepartment = getObjectFromName(this.departments, departmentName);
        if (selectedCourse && selectedDepartment) {
            selectedCourse.addDepartment(selectedDepartment.deparmentId);
            selectedDepartment.addCourse(selectedCourse.courseId);
            console.log(`${courseName} is successully add to ${departmentName} `);
        }
        else {
            console.log("department or Course are not found");
        }
    }
    async displayStudents() {
        for (let student of this.students) {
            let courseNames = [];
            for (let id of student.courses) {
                let course = this.courses.find(course => course.courseId === id);
                if (course) {
                    courseNames.push(course.name);
                }
            }
            console.log("Student NAme", student.name, "\n", "Student age", student.age, "\n", "Student RollNumber", student.rollNumber, "\n", "Student Courses", courseNames.join(","));
        }
    }
    displayTeacherDetails() {
        for (let teacher of this.teachers) {
            let courseName = [];
            for (let id of teacher.courses) {
                let course = this.courses.find(course => course.courseId === id);
                if (course) {
                    courseName.push(course.name);
                }
            }
            console.log("Teacher Name", teacher.name, "\n", "Teacher age", teacher.age, "\n", "Teacher Salary", teacher.salary, "\n", "Teacher ID ", teacher.teacherId, "\n", "Teacher Courses", courseName.join(","));
        }
    }
    async displayDepartment() {
        for (let department of this.departments) {
            let courseNames = [];
            for (let id of department.courses) {
                let course = this.courses.find(course => course.courseId === id);
                if (course) {
                    courseNames.push(course.name);
                }
            }
            console.log("Department Name", department.name, "\n", "Department Id ", department.deparmentId, "\n", "Department Courses", courseNames.join(","));
        }
    }
    async displayCourses() {
        for (let course of this.courses) {
            let studentNames = [];
            let teacherNames = [];
            for (let id of course.students) {
                let student = this.students.find(student => student.rollNumber === id);
                studentNames.push(student?.name);
            }
            for (let id of course.teachers) {
                let teacher = this.teachers.find(teacher => teacher.teacherId === id);
                teacherNames.push(teacher?.name);
            }
            console.log("Course Name: ", course.name, "\n", "Course ID:", course.courseId, "\n", "Course Teachers", teacherNames.join(","), "\n", "Students enrolled in course:", studentNames.join(","));
        }
    }
}
let s = new studentManagementSystem();
s.start();
