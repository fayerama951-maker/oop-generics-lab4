/* let enrolledStudent=[];
enrolledStudent.push("AWA");
console.log(enrolledStudents[0]); */


class Course {
    //Attributes
    name:string;
    code:number;

    constructor(){
        this.name= "Default";
        this.code=0;
    }
    //Methodes
    printCourse(){
        console.log(`The course name is ${this.name});
    }
}
const webdev =new Course();
webdev.printCourse(); 
