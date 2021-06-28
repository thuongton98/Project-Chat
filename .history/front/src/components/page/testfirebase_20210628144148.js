import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import firebaseConfig from '../../../config/firebase'

import {useState} from 'react'


function Firebase(){
    
   
    const [firstname,setfirstname] = useState('')


    if(firstname!==''){
        console.log('x')
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