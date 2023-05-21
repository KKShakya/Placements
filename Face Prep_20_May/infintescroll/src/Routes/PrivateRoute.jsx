import React from 'react'
import { useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { Appcontext } from '../components/AppContext';

const PrivateRoute = ({children}) => {
const {authenticate} = useContext(Appcontext);

 //if loggedin then visit protected route otherwise login page
 if(authenticate){
  return children;
 }else{
  alert("Please Login First")
    return <Navigate to="/"/>

 }
 
}

export default PrivateRoute;