class Course
{
    constructor (id, time, date, classList)
    {
        this.id= id;
        this.time = time;
        this.date = date;
        this.classList = classList;
    }

    toString ()
    
    {
        return this.id+'';
    }
}
class Student
{
    constructor (id, name, gpa, courses)
    {
        this.id = id;
        this.name = name;
        this.gpa = gpa;
        this.courses = courses;
        
    }
    toString ()
    {
        return this.id+'';
    }
}

class Database
{
    constructor ()
      {
        this.courses =  new Map()
        this.students = new Map()
        this.readSData()
        this.readCData()
      }
           
     readSData ()
     {
        var url = "https://maeyler.github.io/JS/data/Students.txt"
        fetch(url)
        .then(res => res.text())
        .then(res => [this.addStudents(res)]) 
     }
     
    readCData()
    {
       var url = "https://maeyler.github.io/JS/data/Courses.txt"
       fetch(url)
       .then(res => res.text()) 
       .then(res => [this.addCourses(res)])
    }
    
    addStudents(txt)
     {
      let a = txt.split("\n");
	 
	  for (let line of a)
       {
          let b = line.split("\t");
          let id = b[0], name = b[1], gpa = b[2];
          let list = [];
          for (let i=3; i<b.length; i++){list.push(b[i]);}
          
     	  const std = new Student(id, name, gpa, list);
    	  this.students.set(std.id, std);
		}
            
	}

  addCourses(txt)
   {
  	
      let a = txt.split("\n");

      for (let line of a)
      {
           let b = line.split("\t");
           let id = b[0], time = b[1], date = b[2];
           let list = [];
           for (let i=3; i<b.length; i++){list.push(b[i]);}

           const course = new Course(id, time, date, list)
           this.courses.set(course.id, course)
      }

  
   }
//////////////
  randomStd()
  {
      const keys = Array.from(this.students.keys())
      let key = keys[Math.trunc(keys.length * Math.random())];
      let std = this.students.get(key);
       return ("std name:"+std.name +" "+"\n std no:" +std.id);
  }

  findgpaabov(gpa)// her ortalama için kaç tane ogrenci var
  {
    var c=0
    for (let std of this.students.values()) 
    {
      if(std.gpa>gpa)
      { c+=1}
    }  
     return ("GPA is: "+gpa+" \n student number is: "+c);

  }
  findgpaunder(gpa)// her ortalama için kaç tane ogrenci var
  {
    var c=0
    for (let std of this.students.values()) 
    {
      if(std.gpa<gpa)
      { c+=1}
    }  
     return ("GPA is: "+gpa+" \n student number is: "+c);

  }
   findStdCourses(id) //Givs a student courses
  {  
      let std=this.students.get(id);
      
    return ("Courses: "+" "+std.courses+" ");
  }
  

  findExam(id) 
  {   //Exam schedule for a given student 
    let std1=this.students.get(id);
    
    let prog=std1.id+" "+std1.name+" Exam schedule: "

  let lessons=std1.courses;

  for (let l of lessons)
   {
     let c=this.courses.get(l)

     prog+="\n"+c.id+" "+ c.time+ " "+ c.date+ " "+ c.classList;
   }
   
   return (prog);

  }//Student list taking a given course

  findcoursesstdlist(course){

    var stds = "";
    for (let std2 of this.students.values()){
      for (let d of std2.courses){
        if(d==course){
          stds+=+ "\n"+std2.id+"  "+std2.name + "\n";
        }

      }
    }
  
    return ("student list that take this course:"+"\n"+stds );

  }
//Course list for a given exam room
examroom(room){
var list=room+ " exam courses list are: ";
for (let a of this.courses.values()) {
 for (let b of a.classList) {
  if(b==room){ list+="\n"+a.id;}
 
 }
}
return list;

}
// Total number of courses in a given room
examroom1(room){
let counter=0;
for (let k of this.courses.values()) {
 for (let n of k.classList) {
  if(n==room){counter+=1;;}
}}
return counter;}
///// more one query
averagegpa(ders){
var count=0;
var toplam=0;


    for (let i of this.students.values()){
      for (let j of i.courses){
        if(j==ders){
          count=count+1;
          var a = parseInt(i.gpa) 
          toplam+=a;
        }

      }
    }
    return ("average gpa of given course is: "+toplam/count)}
    delate() 

  {
    return ""
  }

  getbyname(isim){
    let student1="";
for (let n of this.students.values()) {
  if(n.name==isim)

    {student1+="\n "+n.id;

  }
 
}
return (isim+": names student numbers are:"+student1);
  }
  randomcours()//student random olarak seçmek
  {
      const keys = Array.from(this.courses.keys())
      let key = keys[Math.trunc(keys.length * Math.random())];
      let c = this.courses.get(key);
       return ("cours id:"+c.id);
  }
  }
  
// mou3adl 9esm mta dars // 3ana liste ogrenci nakhou gpa mta3hom
 //