import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import db from '../../../config/firebase'

import {useState,useRef,useEffect} from 'react'


function Firebase(){

    
   
   var inputref = useRef()
    const [firstname,setfirstname] = useState('')
    const [mess,setmess] = useState('')
    const [allmess,setallmess] = useState('')
    const [reset,setreset] = useState('')

    function addmess(e){
        setmess(e)
      
    }
    
    //get data firebase
    useEffect(() => {
        const fetchChat = db.database().ref("messages/");
       
        fetchChat.on("value", function (snapshot) {
          

          var z =[]
         
         

          snapshot.forEach(data => {
            const dataVal = data.val()
            z.push({
              id: data.key,
              user: dataVal.usr,
              mess: dataVal.msg
            })
          
          });
          setallmess(z)
        })
    }, [])
  
function showallmess(e){
    
  
       return(
           <div>
             <h3>show mess :</h3>
             {e.map((value,index)=>{
                 return(
                     <div key={index}>{value.user}: {value.mess}</div>
                 )
             })}
           </div>
       )
   
}
if(reset!==''){
    inputref.value=''
}
    if(firstname!==''){
        return(
            <section className="p404">
            <h1>Test Firebase Chat</h1>
             {showallmess(allmess)}
           
            <Formik
       initialValues={{ mess: '' }}
       validationSchema={Yup.object({
         mess: Yup.string()
           
           .required('chua nhap mess'),
         
         
       })}
       onSubmit={(values, { setSubmitting }) => {
       
        const timestamp = Date.now();
        db.database().ref("messages/" + timestamp).set({
            usr: firstname,
            msg: values.mess,
          });
          
       
       }}
     >
       <Form>
         <label htmlFor="mess">Nhap mess:</label>
         <Field name="mess" type="text" />
         <ErrorMessage name="mess" />
 
 
         
 
         <button type="submit">Submit</button>
       </Form>
     </Formik>
          </section>
        )
    }
    return(
        <section className="p404">
        <h1>Test Firebase Chat</h1>
         <Formik
       initialValues={{ firstName: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('chua nhap first name'),
         
         
       })}
       onSubmit={(values, { setSubmitting }) => {
        setfirstname(values.firstName)
       }}
     >
       <Form>
         <label htmlFor="firstName">First Name</label>
         <Field name="firstName" type="text" />
         <ErrorMessage name="firstName" />
 
 
         
 
         <button type="submit">Submit</button>
       </Form>
     </Formik>
      </section>
    )
}

export default Firebase