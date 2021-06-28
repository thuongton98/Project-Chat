import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import firebaseConfig from '../../../config/firebase'
import * as firebase from 'firebase/app';

function Firebase(){
    console.log(firebaseConfig)

    return(
        <section className="p404">
        <h1>Test Firebase Chat</h1>
         <Formik
       initialValues={{ firstName: '', mess: '' }}
       validationSchema={Yup.object({
         firstName: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('chua nhap first name'),
         mess: Yup.string()
           
           .required('chua nhap mess'),
         
       })}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 400);
       }}
     >
       <Form>
         <label htmlFor="firstName">First Name</label>
         <Field name="firstName" type="text" />
         <ErrorMessage name="firstName" />
 
         <label htmlFor="lastName">Mess</label>
         <Field name="lastName" type="text" />
         <ErrorMessage name="lastName" />
 
         
 
         <button type="submit">Submit</button>
       </Form>
     </Formik>
      </section>
    )
}

export default Firebase