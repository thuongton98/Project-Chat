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
var allmess=[]
const addMess = ({ name,mess,id}) => {
  


  const messz = { name,mess,id}
  allmess.push(messz);


}
let MessDb = require('./models/mess-model')



io.on("connection", function (socket) {
    MessDb.find()
    .then(mess => res.json(mess))
    .catch(err => res.status(400).json('Error: ' +err));
    
    socket.on('user', data => {
      
        io.emit('allmess',allmess)
  //add vap user
    const user = addUser({id:socket.id,name:data.username})
    io.emit('getuser',users)
   
    
     });
     
     socket.on('mess', data => {
      
       
        //add vap mess
        const mess = addMess({name:data.username,mess:data.mess,id:socket.id})
          io.emit('allmess',allmess)
          
    const newMess = new Mess({
        name:data.username,
        mess:data.mess,
        
    });
    newMess.save()
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
     if(users.length<1){
        allmess = []
     }
    })