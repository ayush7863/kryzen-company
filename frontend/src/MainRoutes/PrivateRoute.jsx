import React from 'react'
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const PrivateRoute = ({children}) => {
  const getToken=localStorage.getItem("token");

  if(getToken){
    return children;
  }
  return <Navigate to={"/login"}/>

  // return (
  //   <div>PrivateRoute</div>
  // )
}

export default PrivateRoute