const express = require("express");
const bodyParser = require("body-parser");
const teachersRouter = require("./routers/teachersRouter");
const teacherRouter = require("./routers/teacherRouter");
const app = express();
app.get("/",(request,response)=>{
  response.send("Teacher server");
});
app.use(bodyParser.json());
app.use("/teachers", teachersRouter);
app.use("/teacher", teacherRouter);
const server=app.listen(8080, (request, response) => {
  console.log(`Server running on port ${server.address.port}.`)
});