import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Form from "../pages/Form";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route
        path={"/form"}
        element={
          <PrivateRoute>
            <Form />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
