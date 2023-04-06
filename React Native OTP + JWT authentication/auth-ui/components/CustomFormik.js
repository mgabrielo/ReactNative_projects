//import liraries
import { Formik } from 'formik';
import React from 'react';


// create a component
const CustomFormik = ({ children, initialValues, validationSchema, onSubmit }) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {() => {

                return children
            }}
        </Formik>
    )
}


//make this component available to the app
export default CustomFormik;
