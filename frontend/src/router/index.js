import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import ReportIssue from "../pages/ReportIssue";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AllUsers from "../pages/AllUsers";
import Register from "../pages/Register";
import MyReports  from "../pages/MyReports";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reportIssue" element={<ReportIssue />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="allusers" element={<AllUsers />} />
        <Route path="register" element={<Register />} />
        <Route path="myreports" element={<MyReports />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
