import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

//import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="reports" element={<Reports />} />
        <Route path="login" element={<Login />} />
        <Route path="Addreport" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;