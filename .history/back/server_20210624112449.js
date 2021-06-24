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



  const messRouter = require('./routes/mess');

  app.use('/mess',messRouter);
  const roomRouter = require('./routes/room');

  app.use('/room',roomRouter);


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
let RoomDb = require('./models/room-model')



io.on("connection", function (socket) {
   
  
    
    socket.on('user', data => {
        MessDb.find()
        .then(mess => io.emit('allmess',mess))
        
  //add vap user
    const user = addUser({id:socket.id,name:data.username})
    io.emit('getuser',users)
   
    
     });
     
     socket.on('mess', data => {
      
       
        MessDb.find()
        .then(mess => {
            const newMess = new MessDb({
                name:data.username,
                mess:data.mess,
                room_id:data.room_id
                
            });
            newMess.save()

            mess.push(newMess)
            io.emit('allmess',mess)
        }
            
            )
          
    
           });
           socket.on('room', data => {
           RoomDb.find()
           .then(room =>{
            
            room.filter(function(value){
              const find = value.room_id.filter(function(value){
                return (value === data[0] || value === data[1])
              })
              if(find.length<2){
                const newRoom = new RoomDb({
                 
                  room_id:data
                  
              });
              newRoom.save()
              }
              
             })
            
           })
           
        
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
       socket.on('out',data=>{
       if(users.length>0){
        for(let i=0;i<users.length;i++){
         for(let j=0;j<data.length;j++){
           if(users[i].id === data[j].id){
              users.splice(i,1)
              io.emit('getuser',users)
           }
         }
        }
     
      }
       })
    })