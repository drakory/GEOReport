import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import ReportIssue from "../pages/ReportIssue";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AllUsers from "../pages/AllUsers";
import Register from "../pages/Register";
import MyReports  from "../pages/MyReports";
import AllReportsResolved from "../pages/AllReportsResolved";
import UpdateReportPage from "../pages/UpdateReportPage";
import UpdateReportForm from "../pages/UpdateReportForm";
import MyReportUpdateForm from "../pages/MyReportUpdateForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="reportIssue" element={<ReportIssue />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="allusers" element={<AllUsers />} />
        <Route path="register" element={<Register />} />
        <Route path="myreports" element={<MyReports />} />
        <Route path="allreportsresolved" element={<AllReportsResolved />} />
        <Route path="updatereportpage" element={<UpdateReportPage />} />
        <Route path="update-report/:id" element={<UpdateReportForm />} />
        <Route path="update-my-report/:id" element={<MyReportUpdateForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
