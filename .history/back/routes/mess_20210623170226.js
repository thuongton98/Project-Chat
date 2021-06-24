const router = require('express').Router();
// lay du lieu
let Mess = require('../models/mess-model');
//truen ra 
router.route('/').get((req, res)=>{
    Mess.find()
        .then(mess => res.json(mess))
        .catch(err => res.status(400).json('Error: ' +err));
});

//add vao
router.route('/add').post((req,res)=>{
    
    const name = req.body.username;
    const mess = req.body.mess;
    
  
    const newMess = new Mess({
        name,
        mess,
        
    });

    newMess.save()
       .then(()=>res.json('mess added!'))
       .catch(err => res.status(400).json('Error: '+err));
});