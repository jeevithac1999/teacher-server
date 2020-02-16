const express = require("express");
const teachers = require("../models/teachers.js");

const teachersRouter = express.Router();

teachersRouter
.get("/",(request,response)=>{
  response.status(200).send({teachers});
  })
  .post("/",(request,response)=>{
    const teachers_list=request.body.teachers;
    const teach_list=teachers_list.every(teacher=>{
      return teacher.id && teacher.name;
    });
    if(teach_list){
      teach_list.forEach(teacher=>teachers_list.push(teacher));
      response.status(200).send({message:"Teachers added to list successfully"})
    }
    else{
      response.ststus(400).send({error:"Bad Request"});
    }
  })
  .delete("/",(request,response)=>{
    const deleteids=request.body.ids;
    const count=0;
    deleteids.forEach(id=>{
      teachers.forEach((teacher,index)=>{
        if(teacher.id==id){
          teachers.splice(index,1);
          count++;
        }
      });
    });
    if(count!==0){
      response.status(200).send({message:`${count} teachers were removed`});
    }else{
      response.status(400).send({error:"ID not found"})
    }
  });
  
module.exports = teachersRouter;
