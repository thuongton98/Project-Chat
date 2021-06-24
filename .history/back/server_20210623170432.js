const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require("socket.io");

require('dotenv').config();

const app = express();


const port=process.env.PORT || 5000;

var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

// DB Config
const db = require('./config/key').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));






  const  server = app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});



const io = socket(server);


// xem bao nhieu nguoi online 
var users=[]
const addUser = ({ id,name,token}) => {
  


  const user = { id,name}
  users.push(user);


}
let Mess = require('./models/mess-model')

io.on("connection", function (socket) {
   
    
    socket.on('user', data => {
      
        io.emit('allmess',Mess)
  //add vap user
    const user = addUser({id:socket.id,name:data.username})
    io.emit('getuser',users)
   
    
     });
     
     socket.on('mess', data => {
      
       
        //add vap mess
       
          io.emit('allmess',Mess)
           });
     socket.on('disconnect',data=>{
        if(users.length>0){
          for(let i=0;i<users.length;i++){
            if(users[i].id===socket.id){
              users.splice(i,1)
              io.emit('getuser',users)
            }
          }
       
        }
       })
    
    })