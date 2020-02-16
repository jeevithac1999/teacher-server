const express = require("express");
const teachers = require("../models/teachers");

const teacherRouter = express.Router();

teacherRouter
.post("/",(req,res)=>{
  if(req.body.id && req.body.firstName){
    teachers.push(req.body);
    res.status(200).json({message:`Teacher created successfully`});
  }else{
    res.status(400).send("Bad Request");
  }
})
.get("/:id", (req, res) => {
  const { id = "" } = req.params;
  const requiredTeacher = teachers.find(teacher => {
    if (parseInt(id) === teacher.id) return true;
    else return false;
  });
  if(requiredTeacher) {
    res.status(200).json({ teacher: requiredTeacher });
  } else {
    res.status(404).send("Not Found");
  }
})
.patch("/:id", (req, res) => {
  const { id } =req.params;  
  let requiredTeacherIndex;
  const requiredTeacher = teachers.find((teacher, teacherIndex) => {
    if (parseInt(id) === teacher.id) {
      requiredTeacherIndex = teacherIndex;
      return true;
    } else return false;
  });
  if(requiredTeacher){
  const { 
    firstname=requiredTeacher.firstname,
    lastname=requiredTeacher.lastname, 
    age=requiredTeacher.age,
    gender=requiredTeacher.gender,
    courses=requiredTeacher.courses,
    salary=requiredTeacher.salary } = req.body;
  teachers[requiredTeacherIndex]={
    id:requiredTeacher.id,
    firstname,
    lastname,
    age,
    gender,
    courses,
    salary
  };
  console.log(req.body);
  console.log(requiredTeacher);
  console.log(requiredTeacherIndex);
  res.send("ok");
}else{
res.status(400).send("Bad Request")
}
})
.delete("/:id", (req, res) => {
  const {id} = req.params;
  let requiredTeacherIndex;
  const requiredTeacher = teachers.find((teacher, teacherIndex) => {
    if (parseInt(id) === teacher.id) {
      requiredTeacherIndex = teacherIndex;
      return true;
    }
    return false;
  });
  if(requiredTeacher) {
    teachers.splice(requiredTeacherIndex, 1);
    res.status(200).json({ message: "Teacher has been deleted" });
  } else {
    res.status(400).send("Bad Request");
  }
});


module.exports = teacherRouter;
